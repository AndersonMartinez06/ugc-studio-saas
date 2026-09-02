"use client";

import { useMemo, useState } from "react";
import { PLANS } from "@/lib/data";
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
  const [spend, setSpend] = useState(8000);
  const [roas, setRoas] = useState(2.2);
  const [cpv, setCpv] = useState(90);
  const [videos, setVideos] = useState(8);

  const r = useMemo(() => {
    const uplift = Math.min(0.6, 0.06 * Math.pow(videos, 0.75));
    const projRoas = roas * (1 + uplift);
    const curRev = spend * roas;
    const projRev = spend * projRoas;
    const incRev = projRev - curRev;
    const subCost = PLANS[videos];
    const singleCost = cpv * videos;
    return {
      uplift,
      projRoas,
      curRev,
      projRev,
      incRev,
      subCost,
      saveVsSingle: singleCost - subCost,
      roiX: incRev / subCost,
    };
  }, [spend, roas, cpv, videos]);

  return (
    <section id="roi" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          title={
            <>
              Calcula lo que te devuelve <span className="grad-text">cada ciclo</span>
            </>
          }
          subtitle="Mueve los sliders con tus números reales. El testing constante mueve el ROAS; el ROAS mueve tu cuenta de resultados."
        />

        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="glass p-[30px]">
              <Slider label="Inversión mensual en ads" display={money(spend)} value={spend} min={1000} max={50000} step={500} onChange={setSpend} />
              <Slider label="ROAS actual" display={`${roas.toFixed(1)}x`} value={roas} min={1} max={6} step={0.1} onChange={setRoas} />
              <Slider label="Coste por video (compra suelta)" display={money(cpv)} value={cpv} min={40} max={200} step={5} onChange={setCpv} />
              <div>
                <label className="mb-2.5 flex items-baseline justify-between text-sm text-text-mid">
                  Creativos al mes <b className="font-mono text-base text-text-hi">{videos} · {money(PLANS[videos])}/mes</b>
                </label>
                <div className="flex gap-2" role="group" aria-label="Creativos al mes">
                  {[4, 8, 16].map((v) => (
                    <button
                      key={v}
                      aria-pressed={videos === v}
                      onClick={() => setVideos(v)}
                      className={`flex-1 rounded-xl border py-2.5 font-mono ${
                        videos === v
                          ? "border-transparent bg-violet text-white shadow-[0_0_22px_-8px_var(--violet)]"
                          : "border-glass-stroke bg-white/[0.045] text-text-mid"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass flex flex-col gap-[18px] p-[30px] [background:linear-gradient(180deg,rgba(124,92,255,.10),rgba(45,212,232,.04))]">
              <div>
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text-low">
                  Ingreso incremental proyectado / mes
                </div>
                <div className="font-display text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-none tabular-nums text-lime [text-shadow:0_0_30px_rgba(182,240,60,.35)]">
                  {money(r.incRev)}
                </div>
              </div>
              {[
                [`ROAS proyectado (+${Math.round(r.uplift * 100)}% por testing)`, `${r.projRoas.toFixed(1)}x`, false],
                ["Ingreso actual → proyectado", `${money(r.curRev)} → ${money(r.projRev)}`, false],
                ["Coste suscripción", `${money(r.subCost)}/mes`, false],
                [`Ahorro vs. comprar ${videos} sueltos`, `${money(r.saveVsSingle)}/mes`, false],
                ["Retorno sobre la suscripción", `${r.roiX.toFixed(1)}x`, true],
              ].map(([label, val, accent], i) => (
                <div key={i} className="flex items-baseline justify-between border-b border-glass-stroke pb-3 text-[0.92rem] text-text-mid">
                  <span>{label}</span>
                  <b className={`font-mono text-[1.02rem] tabular-nums ${accent ? "text-cyan" : "text-text-hi"}`}>{val}</b>
                </div>
              ))}
              <p className="text-[0.76rem] leading-relaxed text-text-low">
                Modelo ilustrativo: asume una mejora de ROAS por volumen de testing creativo
                (~+{Math.round(r.uplift * 100)}% con {videos} creativos/mes, con rendimientos
                decrecientes). Los resultados reales dependen de oferta, segmentación y calidad de
                la cuenta publicitaria.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
