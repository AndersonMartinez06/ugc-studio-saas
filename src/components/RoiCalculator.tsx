"use client";

import { useMemo, useState } from "react";
import { ROI_PACKS } from "@/lib/data";
import { Reveal, SectionHead } from "./Section";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Slider({
  label,
  display,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  display: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-[22px] last:mb-0">
      <label className="mb-2.5 flex items-baseline justify-between text-sm text-text-mid">
        {label} <b className="font-mono text-base text-text-hi">{display}</b>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ["--pct" as string]: `${pct}%` }}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [spend, setSpend] = useState(6000);
  const [roas, setRoas] = useState(2.2);
  const [packIdx, setPackIdx] = useState(1);

  const pack = ROI_PACKS[packIdx];

  const r = useMemo(() => {
    const uplift = Math.min(0.65, 0.045 * Math.pow(pack.videos, 0.6));
    const projRoas = roas * (1 + uplift);
    const curRev = spend * roas;
    const projRev = spend * projRoas;
    const incRev = projRev - curRev;
    return {
      uplift,
      projRoas,
      curRev,
      projRev,
      incRev,
      costPerVideo: pack.price / pack.videos,
      roiX: incRev / pack.price,
    };
  }, [spend, roas, pack]);

  return (
    <section id="roi" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          eyebrow="Números"
          title={
            <>
              Cuánto te devuelve <span className="grad-text">invertir en creativos</span>
            </>
          }
          subtitle="Mueve los sliders con tus datos reales. Más ángulos probados = más chances de encontrar el video ganador que sostiene la pauta."
        />

        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="glass p-[30px]">
              <Slider
                label="Inversión mensual en ads"
                display={money(spend)}
                value={spend}
                min={500}
                max={40000}
                step={500}
                onChange={setSpend}
              />
              <Slider
                label="ROAS actual"
                display={`${roas.toFixed(1)}x`}
                value={roas}
                min={1}
                max={6}
                step={0.1}
                onChange={setRoas}
              />
              <div>
                <label className="mb-2.5 flex items-baseline justify-between text-sm text-text-mid">
                  Paquete de Creativia{" "}
                  <b className="font-mono text-base text-text-hi">
                    {pack.label} · {money(pack.price)}
                  </b>
                </label>
                <div className="flex gap-2" role="group" aria-label="Paquete">
                  {ROI_PACKS.map((p, i) => (
                    <button
                      key={p.label}
                      aria-pressed={packIdx === i}
                      onClick={() => setPackIdx(i)}
                      className={`flex-1 rounded-xl border py-2.5 font-mono text-sm ${
                        packIdx === i
                          ? "border-transparent bg-violet text-white shadow-[0_0_22px_-8px_var(--violet)]"
                          : "border-glass-stroke bg-white/[0.045] text-text-mid"
                      }`}
                    >
                      {p.label}
                      <span className="block text-[0.62rem] opacity-70">~{p.videos} videos</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass flex flex-col gap-[18px] p-[30px] [background:linear-gradient(180deg,rgba(124,92,255,.10),rgba(34,211,238,.04))]">
              <div>
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text-low">
                  Ingreso extra proyectado / mes
                </div>
                <div className="font-display text-[clamp(2.4rem,6vw,3.4rem)] font-extrabold leading-none tabular-nums text-data [text-shadow:0_0_30px_rgba(34,211,238,.35)]">
                  {money(r.incRev)}
                </div>
              </div>
              {[
                [`ROAS proyectado (+${Math.round(r.uplift * 100)}% por testing)`, `${r.projRoas.toFixed(1)}x`, false],
                ["Ingreso actual → proyectado", `${money(r.curRev)} → ${money(r.projRev)}`, false],
                ["Coste del paquete", `${money(pack.price)} única vez`, false],
                ["Coste por video", `~${money(r.costPerVideo)}`, false],
                ["Retorno sobre el paquete", `${r.roiX.toFixed(1)}x`, true],
              ].map(([label, val, hi], i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-glass-stroke pb-3 text-[0.92rem] text-text-mid"
                >
                  <span>{label}</span>
                  <b className={`font-mono text-[1.02rem] tabular-nums ${hi ? "text-accent" : "text-text-hi"}`}>
                    {val}
                  </b>
                </div>
              ))}
              <p className="text-[0.76rem] leading-relaxed text-text-low">
                Modelo ilustrativo: asume una mejora de ROAS por volumen de testing creativo
                (~+{Math.round(r.uplift * 100)}% con ~{pack.videos} videos, con rendimientos
                decrecientes). Los resultados reales dependen de oferta, segmentación y calidad de la
                cuenta publicitaria.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
