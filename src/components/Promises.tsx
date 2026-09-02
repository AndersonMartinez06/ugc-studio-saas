"use client";

import { motion } from "framer-motion";
import { PROMISES } from "@/lib/data";
import { SectionHead } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Promises() {
  return (
    <section id="compromisos" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          eyebrow="Nuestro compromiso"
          title="Somos un estudio nuevo. Por eso trabajamos con reglas claras."
          subtitle="Todavía no publicamos reseñas porque recién estamos entregando nuestros primeros proyectos. Mientras tanto, esto es lo que te garantizamos por escrito."
        />

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <motion.article
              key={p.idx}
              className="glass relative overflow-hidden rounded-card p-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-card p-px [background:linear-gradient(140deg,rgba(229,48,143,.4),transparent_45%,transparent_60%,rgba(124,92,255,.4))] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor]"
                aria-hidden
              />
              <span className="font-mono text-[1.4rem] font-semibold text-accent/60">{p.idx}</span>
              <h3 className="mt-3 text-[1.1rem] font-extrabold">{p.title}</h3>
              <p className="mt-2 text-[0.94rem] text-text-mid">{p.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className="glass mt-6 rounded-card border-dashed p-6 text-center">
          <p className="text-[0.92rem] text-text-mid">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text-low">
              Testimonios
            </span>
            <br />
            Cuando tengamos las primeras reseñas verificadas de clientes, las vas a ver publicadas
            aquí mismo.
          </p>
        </div>
      </div>
    </section>
  );
}
