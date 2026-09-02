"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHead } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  return (
    <section id="clientes" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          title={
            <>
              190 marcas ya <span className="grad-text">iteran en serie</span>
            </>
          }
          subtitle="Growth leads, media buyers y founders que dejaron de comprar creativos de uno en uno."
        />

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              className="glass relative flex flex-col gap-4 overflow-hidden p-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-card p-px [background:linear-gradient(140deg,rgba(45,212,232,.4),transparent_40%,transparent_60%,rgba(124,92,255,.4))] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor]"
                aria-hidden
              />
              <span className="self-start rounded-pill border border-lime/30 px-2.5 py-1 font-mono text-[0.78rem] text-lime">
                {t.st}
              </span>
              <p className="text-[0.96rem] text-text-hi">&ldquo;{t.q}&rdquo;</p>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-grad font-display text-[0.9rem] font-bold text-[#04141a]">
                  {t.i}
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.88rem] font-semibold text-text-hi">{t.nm}</span>
                  <span className="block text-[0.78rem] text-text-low">{t.rl}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
