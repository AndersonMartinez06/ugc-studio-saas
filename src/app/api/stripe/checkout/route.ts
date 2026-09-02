import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const PRICE_BY_PLAN: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  scale: process.env.STRIPE_PRICE_SCALE,
};

export async function POST(req: NextRequest) {
  const { plan } = (await req.json()) as { plan?: string };
  const priceId = plan ? PRICE_BY_PLAN[plan] : undefined;
  if (!priceId) return NextResponse.json({ error: "Plan inválido" }, { status: 400 });

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id, email")
    .eq("id", user.id)
    .single();

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer: profile?.stripe_customer_id ?? undefined,
    customer_email: profile?.stripe_customer_id ? undefined : profile?.email ?? user.email,
    client_reference_id: user.id,
    allow_promotion_codes: true,
    success_url: `${site}/dashboard?checkout=success`,
    cancel_url: `${site}/#planes`,
  });

  return NextResponse.json({ url: session.url });
}
