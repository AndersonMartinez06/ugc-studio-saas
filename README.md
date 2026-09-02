# Scrollstop — UGC Studio SaaS

Landing page + backend base para una plataforma de contenido UGC por suscripción.
Estética dark cyberpunk / glassmorphism con carrusel 3D de creativos y calculadora de ROI en vivo.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (tokens de diseño en `src/app/globals.css`)
- **Framer Motion** — carrusel 3D, reveals y micro-interacciones
- **Stripe Subscriptions** — checkout + webhooks
- **Supabase** — auth, Postgres, RLS

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # y rellena las llaves
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

Ver `.env.local.example`. Necesitas un proyecto de Supabase y una cuenta de Stripe
con tres precios recurrentes (Starter / Growth / Scale).

## Base de datos

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase db push
```

Aplica `supabase/migrations/0001_init.sql`: tablas `users`, `subscriptions`, `briefs`,
`video_deliverables`, triggers de `updated_at`, creación de perfil al registrarse y políticas RLS.

## Webhook de Stripe

Local:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Producción: apunta un endpoint a `https://TU_DOMINIO/api/stripe/webhook` con los eventos
`customer.subscription.created`, `customer.subscription.updated`,
`customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`.

## Estructura

```
src/
  app/
    page.tsx                landing (Hero + secciones)
    layout.tsx              fuentes (Space Grotesk / Inter / IBM Plex Mono)
    globals.css             tokens de color + utilidades glass/glow
    api/stripe/
      checkout/route.ts     crea la sesión de Checkout
      webhook/route.ts      sincroniza suscripciones y créditos
  components/
    Hero.tsx  UgcCarousel.tsx  RoiCalculator.tsx
    CompareTable.tsx  Testimonials.tsx  Faq.tsx  Pricing.tsx
    Section.tsx            helpers de animación
  lib/
    data.ts                copy y datos de la landing
    stripe.ts              cliente de Stripe + mapa precio→plan
    supabase/client.ts     cliente browser
    supabase/server.ts     cliente servidor + service role
supabase/migrations/0001_init.sql
```
