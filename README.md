# Creativia — landing unificada

Landing de **Creativia** (estudio de video VSL / UGC / POV / IA para tiendas online),
construida sobre Next.js. Fusiona dos proyectos previos:

- **Creativia** (landing estática original) → portada a componentes React.
- **Scrollstop** (app Next.js) → base técnica; aporta el carrusel 3D, la calculadora de ROI
  y la tabla comparativa, además de la infraestructura de Stripe/Supabase (latente).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — sistema de diseño "Creativia × Scrollstop" (tokens en `src/app/globals.css`)
- **Framer Motion** — carrusel 3D, tarjeta de ventas animada, reveals
- Fuentes: **Bricolage Grotesque** (display) · **Plus Jakarta Sans** (cuerpo) · **IBM Plex Mono** (datos)
- **Stripe** + **Supabase** — presentes como infraestructura, sin conectar a la UI (los CTAs van a WhatsApp)

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # solo si vas a activar Stripe/Supabase
npm run dev
```

## Secciones (`src/app/page.tsx`)

| Ancla | Componente | Origen |
|---|---|---|
| `#top` | `Hero` + `SalesCard` + `Marquee` + `HeroStats` | Creativia (+ Scrollstop) |
| `#showcase` | `UgcCarousel` (abanico 3D / tira móvil) | Scrollstop |
| `#formatos` | `Formats` — 6 pestañas con sub-carrusel | Creativia |
| `#proceso` | `Process` — timeline 5 pasos | Creativia |
| `#roi` | `RoiCalculator` — re-enfocada a paquetes | Scrollstop |
| `#comparar` | `CompareTable` — hazlo tú vs. Creativia | Scrollstop |
| `#compromisos` | `Promises` + espacio de testimonios | Creativia |
| `#precios` | `Pricing` — toggle paquete único / suscripción | Ambos |
| `#faq` | `Faq` | Ambos (fusión) |
| `#contacto` | `Contact` — formulario FormSubmit + WhatsApp | Creativia |

## Contacto (editable en `src/lib/data.ts`)

- WhatsApp: `WHATSAPP = "51998987079"`
- Formulario: `CONTACT_EMAIL = "garciamarce0307@gmail.com"` (FormSubmit)

> La primera vez que alguien envía el formulario, FormSubmit manda un correo de
> confirmación a esa dirección. Hasta hacer clic en ese enlace, los mensajes no llegan.

## Pendientes (del proyecto Creativia original)

- [ ] Cargar los videos reales en Formatos y en el carrusel showcase
- [ ] Confirmar el correo de FormSubmit con un envío de prueba
- [ ] Logo propio y favicon
- [ ] Enlaces reales de Instagram / TikTok
- [ ] Píxel de Meta y aviso de privacidad antes de lanzar campañas
- [ ] Imagen Open Graph
