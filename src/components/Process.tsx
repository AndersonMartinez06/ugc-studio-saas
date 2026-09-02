"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS, waLink } from "@/lib/data";
import { SectionHead } from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  return (
    <section id="proceso" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead eyebrow="Cómo funciona" title="De la idea al video final, sin complicaciones" />

        <ol className="relative mx-auto grid max-w-[900px] gap-4 md:grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <motion.li
              key={s.day}
              className="glass flex flex-col gap-2 rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent-soft">
                {s.day}
              </span>
              <h3 className="text-[1.02rem] font-bold leading-tight">{s.title}</h3>
              <p className="text-[0.86rem] text-text-mid">{s.desc}</p>
            </motion.li>
          ))}
        </ol>

        <div className="glass mx-auto mt-10 flex max-w-[900px] flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-none">
            <span className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] text-accent">
              5<span className="mx-1 text-text-low">–</span>10
            </span>
            <span className="mt-1 block font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text-mid">
              días hábiles
            </span>
          </div>
          <p className="flex-1 text-[0.95rem] text-text-mid">
            Plazo total, desde que envías el brief hasta la entrega final de todos los videos.
          </p>
          <a
            href={waLink("Hola Creativia, quiero empezar un proyecto de videos")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none rounded-pill bg-accent px-6 py-3 font-display font-semibold text-white shadow-[0_6px_22px_-6px_rgba(229,48,143,0.6)] transition hover:brightness-110"
          >
            Empezar mi proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
