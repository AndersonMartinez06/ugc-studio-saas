"use client";

import { FAQS } from "@/lib/data";
import { SectionHead } from "./Section";

export default function Faq() {
  return (
    <section id="faq" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead title="Antes de suscribirte" subtitle="Entregas, derechos de uso y créditos — sin letra pequeña." />

        <div className="mx-auto flex max-w-[760px] flex-col gap-3">
          {FAQS.map(([q, a], i) => (
            <details key={i} className="faq-item glass group px-[22px]" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.02rem] font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan">
                {q}
                <span className="relative h-5 w-5 flex-none transition-transform group-open:rotate-180" aria-hidden>
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 bg-cyan" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-cyan transition-opacity group-open:opacity-0" />
                </span>
              </summary>
              <div className="max-w-[64ch] pb-[22px] text-[0.96rem] text-text-mid">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
