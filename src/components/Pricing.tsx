"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PACKAGES, SUBSCRIPTIONS, waLink, type Package, type Subscription } from "@/lib/data";
import { SectionHead } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

type Mode = "paquete" | "suscripcion";

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("paquete");
  const cards: (Package | Subscription)[] = mode === "paquete" ? PACKAGES : SUBSCRIPTIONS;

  return (
    <section id="precios" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          eyebrow="Planes"
          title="Un plan para cada etapa de tu tienda"
          subtitle="Todos los planes incluyen estudio de mercado y entrega en 5 a 10 días hábiles."
        />

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-pill border border-line bg-white/[0.03] p-1">
            {(["paquete", "suscripcion"] as Mode[]).map((m) => (
              <button
                key={m}
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-pill px-5 py-2 text-sm font-semibold transition ${
                  mode === m ? "bg-accent text-white" : "text-text-mid hover:text-text-hi"
                }`}
              >
                {m === "paquete" ? "Paquete único" : "Suscripción mensual"}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`mx-auto grid max-w-[480px] grid-cols-1 gap-[18px] lg:max-w-none ${
            mode === "paquete" ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {cards.map((c, i) => {
            const isPkg = "range" in c;
            const price = c.price;
            const sub = "range" in c ? c.range : c.per;
            return (
              <motion.div
                key={c.tag}
                className={`glass relative flex flex-col gap-1.5 rounded-card p-6 ${
                  c.featured ? "border-accent/45 shadow-[0_0_44px_-14px_rgba(229,48,143,0.6)]" : ""
                }`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-6 rounded-pill bg-accent px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white">
                    Más elegido
                  </span>
                )}
                <h3 className="font-display text-[1.15rem] font-extrabold">{c.tag}</h3>
                <div className="font-display text-[2.1rem] font-extrabold leading-none tracking-[-0.035em]">
                  {price}
                </div>
                <p className="text-[0.85rem] text-text-mid">{sub}</p>
                <ul className="my-4 flex flex-col gap-2.5 text-[0.88rem] text-text-mid">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(c.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex justify-center rounded-pill px-5 py-3 font-display text-[0.95rem] font-bold transition ${
                    c.featured
                      ? "bg-accent text-white shadow-[0_8px_26px_-8px_rgba(229,48,143,0.6)] hover:brightness-110"
                      : "border border-line bg-white/[0.03] text-text-hi hover:border-accent hover:bg-accent/[0.07]"
                  }`}
                >
                  {isPkg ? `Elegir ${c.tag}` : "Suscribirme"}
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-mono text-[0.78rem] text-text-low">
          Precios en USD. Todos los paquetes incluyen estudio de mercado, guion y edición.
        </p>
      </div>
    </section>
  );
}
