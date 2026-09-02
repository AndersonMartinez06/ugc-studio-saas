"use client";

import { motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import { waLink, WA_DEFAULT } from "@/lib/data";
import Marquee from "./Marquee";
import HeroStats from "./HeroStats";
import SalesCard from "./SalesCard";

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
    <header id="top" className="relative overflow-hidden pt-[104px]">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_70%_55%_at_12%_-5%,rgba(229,48,143,0.18),transparent_68%)]" />
      <div className="pointer-events-none absolute -right-[12%] -top-[20%] -z-10 h-[150%] w-[52%] rotate-[18deg] bg-[linear-gradient(200deg,rgba(124,92,255,0.26),transparent_62%)] blur-[60px]" />

      <div className="shell grid items-center gap-14 pb-16 pt-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-accent/[0.07] px-3.5 py-1.5 font-mono text-[0.75rem] tracking-[0.02em] text-accent-soft">
              <Clock className="h-3.5 w-3.5" />
              Entrega en 5 a 10 días hábiles
            </span>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.15rem)] font-extrabold leading-[0.98] tracking-[-0.04em] min-[1920px]:text-[5.2rem]">
              Videos que convierten visitas en <span className="grad-text">ventas</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="mx-auto mt-6 max-w-[32em] text-[1.08rem] text-text-mid lg:mx-0">
              Creativia produce VSL, UGC, POV y videos con IA para tiendas online. Guion, estudio de
              mercado, producción y edición incluidos — sin que muevas un dedo.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <a
                href={waLink(WA_DEFAULT)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa btn-sheen inline-flex items-center gap-2 rounded-pill px-7 py-4 font-display text-[1rem] font-bold"
              >
                <MessageCircle className="h-[19px] w-[19px]" />
                Escríbenos por WhatsApp
              </a>
              <a
                href="#precios"
                className="inline-flex items-center rounded-pill border border-line px-7 py-4 font-display text-[1rem] font-bold text-text-hi transition hover:border-accent hover:bg-accent/[0.07]"
              >
                Ver planes y precios
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.28}>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.03em] text-text-mid">
              <span className="h-[7px] w-[7px] rounded-full bg-[#34D399] shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" />
              Respuesta rápida por WhatsApp
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <SalesCard />
        </FadeIn>
      </div>

      <Marquee />
      <HeroStats />
    </header>
  );
}
