import Stripe from "stripe";

// Fallback a "" para que el build no rompa cuando faltan las llaves.
// En runtime, las rutas que usan Stripe validan que la llave exista.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
});

export const PRICE_TO_PLAN: Record<
  string,
  { plan: "starter" | "growth" | "scale"; videos: number }
> = {
  [process.env.STRIPE_PRICE_STARTER || "price_starter"]: { plan: "starter", videos: 4 },
  [process.env.STRIPE_PRICE_GROWTH || "price_growth"]: { plan: "growth", videos: 8 },
  [process.env.STRIPE_PRICE_SCALE || "price_scale"]: { plan: "scale", videos: 16 },
};
