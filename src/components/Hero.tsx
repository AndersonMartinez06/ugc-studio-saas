"use client";

import { motion } from "framer-motion";
import UgcCarousel from "./UgcCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden pt-[clamp(90px,13vw,150px)] text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_top,rgba(45,212,232,.14),transparent_55%)]" />

      <div className="mx-auto max-w-4xl px-6 min-[1920px]:max-w-5xl">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-pill border border-glass-stroke bg-white/[0.045] px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text-mid">
            <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
            UGC on-demand · nuevo drop cada semana
          </span>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="mt-6 text-[clamp(2.4rem,6.2vw,4.3rem)] font-bold min-[1920px]:text-[5.4rem]">
            Anuncios que la gente detiene el scroll para ver.{" "}
            <span className="grad-text">En automático, cada mes.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-5 max-w-[620px] text-[1.1rem] text-text-mid min-[1920px]:max-w-[760px] min-[1920px]:text-[1.35rem]">
            Deja de pagar $300 por un video que caduca en 5 días. Recibe un flujo constante de
            creativos UGC listos para escalar — grabados por creadores verificados y medidos por
            rendimiento real.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a
              href="#planes"
              className="glow-border rounded-pill bg-cyan px-6 py-3.5 font-display font-semibold text-[#04141a] shadow-[0_0_42px_-10px_var(--cyan)] transition hover:brightness-110"
            >
              Empezar mi suscripción →
            </a>
            <a
              href="#showcase"
              className="rounded-pill border border-glass-stroke bg-white/[0.045] px-6 py-3.5 font-display font-semibold text-text-hi transition hover:border-white/25"
            >
              Ver creativos en acción
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-6 font-mono text-[0.76rem] tracking-[0.04em] text-text-low">
            +2.400 creativos entregados · 190 marcas escalando · 4.9/5 valoración media
          </p>
        </FadeIn>
      </div>

      <div id="showcase" className="shell">
        <UgcCarousel />
      </div>
    </header>
  );
}
