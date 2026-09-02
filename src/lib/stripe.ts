import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Falta STRIPE_SECRET_KEY en el entorno");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PRICE_TO_PLAN: Record<string, { plan: "starter" | "growth" | "scale"; videos: number }> = {
  [process.env.STRIPE_PRICE_STARTER ?? "price_starter"]: { plan: "starter", videos: 4 },
  [process.env.STRIPE_PRICE_GROWTH ?? "price_growth"]: { plan: "growth", videos: 8 },
  [process.env.STRIPE_PRICE_SCALE ?? "price_scale"]: { plan: "scale", videos: 16 },
};
