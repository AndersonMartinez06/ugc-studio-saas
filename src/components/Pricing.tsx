"use client";

import { motion } from "framer-motion";
import { PRICING } from "@/lib/data";
import { SectionHead } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Pricing() {
  return (
    <section id="planes" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead
          title={
            <>
              Elige tu <span className="grad-text">ritmo de testing</span>
            </>
          }
          subtitle="Sin contrato. Pausa, sube o baja de plan cuando quieras. Créditos acumulables 60 días."
        />

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.tag}
              className={`glass flex flex-col gap-2 p-7 ${
                p.featured ? "!border-cyan/40 shadow-[0_0_40px_-14px_var(--cyan)]" : ""
              }`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-cyan">{p.tag}</span>
              <div className="mt-1.5 font-display text-[2.2rem] font-bold">
                {p.price}
                <span className="text-[0.9rem] font-normal text-text-low"> {p.per}</span>
              </div>
              <ul className="my-3.5 mb-5 flex flex-col gap-2.5 text-[0.9rem] text-text-mid">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 before:font-bold before:text-cyan before:content-['›']">
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-auto inline-flex justify-center rounded-pill px-6 py-3.5 font-display font-semibold transition ${
                  p.featured
                    ? "bg-cyan text-[#04141a] shadow-[0_0_42px_-10px_var(--cyan)] hover:brightness-110"
                    : "border border-glass-stroke bg-white/[0.045] text-text-hi hover:border-white/25"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
