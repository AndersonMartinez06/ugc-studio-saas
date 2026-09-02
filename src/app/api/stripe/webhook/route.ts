import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, PRICE_TO_PLAN } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs"; // necesitamos el raw body
export const dynamic = "force-dynamic";

const supabase = createServiceClient();

function mapPlan(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price.id ?? "";
  return PRICE_TO_PLAN[priceId] ?? { plan: "starter" as const, videos: 4 };
}

async function resolveUserId(customerId: string): Promise<string | null> {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  if (data?.id) return data.id;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return null;
  const email = (customer as Stripe.Customer).email;
  if (!email) return null;

  const { data: byEmail } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (byEmail?.id) {
    await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", byEmail.id);
    return byEmail.id;
  }
  return null;
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = await resolveUserId(sub.customer as string);
  if (!userId) throw new Error(`Sin usuario para customer ${sub.customer}`);

  const { plan, videos } = mapPlan(sub);

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: sub.id,
      stripe_price_id: sub.items.data[0]?.price.id ?? "",
      plan,
      videos_per_cycle: videos,
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
    },
    { onConflict: "stripe_subscription_id" },
  );
  return { userId, videos };
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Firma de webhook inválida", err);
    return new NextResponse("Firma inválida", { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await upsertSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.subscription) break;
        const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const { userId, videos } = await upsertSubscription(sub);

        // recarga de créditos del ciclo, con tope de acumulación (~60 días = 2 ciclos extra)
        const { data: u } = await supabase
          .from("users")
          .select("credits_balance")
          .eq("id", userId)
          .single();
        const capped = Math.min((u?.credits_balance ?? 0) + videos, videos * 3);
        await supabase.from("users").update({ credits_balance: capped }).eq("id", userId);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("stripe_subscription_id", invoice.subscription as string);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            cancel_at_period_end: false,
            canceled_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error(`Error procesando ${event.type}`, err);
    return new NextResponse("Error de procesamiento", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
