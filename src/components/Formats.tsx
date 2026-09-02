"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { FORMATS, type FormatId } from "@/lib/data";
import { Reveal, SectionHead } from "./Section";

const ICON: Record<FormatId, typeof Zap> = {
  vsl: Zap,
  ugc: Camera,
  pov: Eye,
  ia: Sparkles,
  tiktok: MessageSquare,
  autoridad: ShieldCheck,
};

const HUE: Record<FormatId, string> = {
  vsl: "linear-gradient(150deg,#e5308f,#7c5cff)",
  ugc: "linear-gradient(150deg,#7c5cff,#22d3ee)",
  pov: "linear-gradient(150deg,#f472b6,#e5308f)",
  ia: "linear-gradient(150deg,#22d3ee,#7c5cff)",
  tiktok: "linear-gradient(150deg,#e5308f,#ffb457)",
  autoridad: "linear-gradient(150deg,#7c5cff,#e5308f)",
};

function FormatCarousel({ id, label }: { id: FormatId; label: string }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const page = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
    } else {
      el.scrollBy({ left: step * dir, behavior: reduce ? "auto" : "smooth" });
    }
  }, [reduce]);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => page(1), 3600);
    return () => clearInterval(t);
  }, [reduce, paused, page]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-[9/16] w-[46%] shrink-0 snap-start overflow-hidden rounded-card border border-glass-stroke sm:w-[38%] lg:w-[31%]"
          >
            <div className="absolute inset-0 opacity-90" style={{ backgroundImage: HUE[id] }} />
            <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,.05)_0_1px,transparent_1px_4px)] opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-black/25 backdrop-blur-sm">
                <Play className="ml-0.5 h-4 w-4 fill-white" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-white/85">
                {label} de ejemplo
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => page(-1)}
          aria-label="Video anterior"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.04] text-text-hi transition hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => page(1)}
          aria-label="Video siguiente"
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.04] text-text-hi transition hover:border-accent hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Formats() {
  const [active, setActive] = useState<FormatId>("vsl");
  const current = FORMATS.find((f) => f.id === active)!;
  const Icon = ICON[active];

  return (
    <section id="formatos" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <SectionHead
          eyebrow="Solo para tiendas online"
          title="Los formatos que hoy venden en redes"
          subtitle="Nos especializamos en un solo rubro: ecommerce. Elige un formato para ver de qué se trata y los ejemplos que iremos sumando."
        />

        <Reveal>
          <div
            className="mb-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Formatos de video"
          >
            {FORMATS.map((f) => {
              const on = f.id === active;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(f.id)}
                  className={`rounded-pill border px-4 py-2 text-sm font-medium transition ${
                    on
                      ? "border-transparent bg-accent text-white shadow-[0_6px_22px_-8px_rgba(229,48,143,0.6)]"
                      : "border-line bg-white/[0.03] text-text-mid hover:text-text-hi"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="glass grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-accent/10 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-[1.6rem] font-extrabold">{current.title}</h3>
              <p className="mt-2 text-[0.98rem] text-text-mid">{current.desc}</p>
            </div>
            <FormatCarousel key={active} id={active} label={current.label} />
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-[0.78rem] text-text-low">
          Estos son espacios de muestra. Vamos a reemplazarlos por videos reales de cada formato.
        </p>
      </div>
    </section>
  );
}
