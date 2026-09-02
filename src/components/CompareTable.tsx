"use client";

import { CMP_ROWS } from "@/lib/data";
import { Reveal, SectionHead } from "./Section";

export default function CompareTable() {
  return (
    <section id="comparar" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHead
          title={
            <>
              Comprar videos sueltos <span className="text-text-low">vs.</span> suscripción
            </>
          }
          subtitle="La compra única resuelve hoy. La suscripción construye una máquina de iteración creativa."
        />

        <Reveal>
          <div className="glass overflow-x-auto p-1.5 pb-0">
            <table className="w-full min-w-[520px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left font-display text-[0.82rem] uppercase tracking-[0.06em] text-text-low">&nbsp;</th>
                  <th className="px-4 py-4 text-left font-display text-[0.82rem] uppercase tracking-[0.06em] text-text-low">
                    Videos sueltos
                  </th>
                  <th className="rounded-t-xl border-x border-t border-cyan/40 bg-gradient-to-b from-cyan/10 to-transparent px-4 py-4 text-left font-display text-[0.82rem] uppercase tracking-[0.06em] text-cyan">
                    Suscripción Scrollstop
                  </th>
                </tr>
              </thead>
              <tbody>
                {CMP_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="border-b border-glass-stroke px-4 py-4 text-[0.94rem] text-text-mid">{row[0]}</td>
                    <td className={`border-b border-glass-stroke px-4 py-4 text-[0.94rem] ${row[1] === "—" ? "text-text-low" : "text-text-hi"}`}>
                      {row[1]}
                    </td>
                    <td className="border-x border-b border-cyan/25 bg-gradient-to-b from-cyan/[0.09] to-transparent px-4 py-4 text-[0.94rem] font-semibold text-lime">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
