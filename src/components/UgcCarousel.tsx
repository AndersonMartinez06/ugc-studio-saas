"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Play, TrendingUp } from "lucide-react";
import { NICHES, SLIDES, NICHE_GRADIENT, type Niche } from "@/lib/data";

export default function UgcCarousel() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Niche>("Todos");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(
    () => (filter === "Todos" ? SLIDES : SLIDES.filter((s) => s.niche === filter)),
    [filter],
  );
  const len = slides.length;
  const safe = ((index % len) + len) % len;

  const go = useCallback((d: number) => setIndex((i) => i + d), []);

  useEffect(() => {
    if (paused || reduce || len <= 1) return;
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, [paused, reduce, len]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      tabIndex={0}
      aria-roledescription="carrusel de creativos UGC"
      className="outline-none"
    >
      {/* filtros */}
      <div className="mb-2 mt-11 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por nicho">
        {NICHES.map((n) => {
          const active = filter === n;
          return (
            <button
              key={n}
              aria-pressed={active}
              onClick={() => {
                setFilter(n);
                setIndex(0);
              }}
              className={`rounded-pill border px-4 py-2 text-sm transition ${
                active
                  ? "border-transparent bg-cyan font-semibold text-[#04141a] shadow-[0_0_22px_-6px_var(--cyan)]"
                  : "border-glass-stroke bg-white/[0.045] text-text-mid hover:text-text-hi"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>

      {/* escenario 3D */}
      <div
        className="relative mt-5 flex h-[540px] items-center justify-center"
        style={{ perspective: reduce ? undefined : "1700px" }}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 h-32 blur-lg [background:radial-gradient(ellipse_at_center,rgba(124,92,255,.28),transparent_70%)]" />

        {slides.map((s, i) => {
          let off = i - safe;
          if (off > len / 2) off -= len;
          if (off < -len / 2) off += len;
          const abs = Math.abs(off);
          if (abs > 2) return null;
          const active = off === 0;

          return (
            <motion.article
              key={s.id}
              className={`glow-border absolute w-[300px] cursor-pointer rounded-card ${
                active ? "" : "[&>div]:!shadow-none"
              }`}
              style={{ transformStyle: "preserve-3d", zIndex: 10 - abs }}
              initial={false}
              animate={
                reduce
                  ? { x: off * 130, scale: active ? 1 : 0.82, opacity: active ? 1 : 0.35 }
                  : {
                      x: off * 230,
                      rotateY: off * -24,
                      z: -abs * 260,
                      scale: 1 - abs * 0.12,
                      opacity: 1 - abs * 0.32,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={() => !active && setIndex(index + off)}
              whileHover={active ? { scale: reduce ? 1 : 1.03 } : {}}
              aria-hidden={!active}
            >
              <div
                className={`relative overflow-hidden rounded-card border border-glass-stroke bg-surface ${
                  active
                    ? "shadow-[0_0_0_1px_rgba(45,212,232,.5),0_0_34px_-6px_rgba(45,212,232,.5),0_0_70px_-12px_rgba(124,92,255,.45)]"
                    : "shadow-[0_40px_90px_-50px_#000]"
                }`}
              >
                <div className="relative aspect-[9/16] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-[length:200%_200%] ${active ? "animate-drift" : ""}`}
                    style={{ backgroundImage: NICHE_GRADIENT[s.niche] }}
                  />
                  {/* scanlines */}
                  <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,.05)_0_1px,transparent_1px_4px)]" />

                  {!active && (
                    <div className="absolute inset-0 m-auto grid h-[54px] w-[54px] place-items-center rounded-full border border-white/30 bg-void/50 backdrop-blur-sm">
                      <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                    </div>
                  )}

                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-pill border border-white/15 bg-void/55 px-2 py-1 text-xs text-white backdrop-blur">
                    <span>{s.creator}</span>
                    {s.verified && <BadgeCheck className="h-3.5 w-3.5 text-cyan" />}
                  </div>
                  <div className="absolute right-2.5 top-2.5 rounded-pill bg-violet/70 px-2 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
                    {s.niche}
                  </div>

                  <div className="absolute inset-x-3 bottom-3 h-[3px] overflow-hidden rounded-sm bg-white/20">
                    <i className={`block h-full bg-cyan shadow-[0_0_10px_var(--cyan)] ${active ? "animate-scrub" : "w-[38%]"}`} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {active && (
                  <motion.div
                    className="absolute -right-3.5 bottom-14 flex flex-col gap-2 max-[760px]:right-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    aria-hidden
                  >
                    {s.metrics.map(([l, v]) => (
                      <div
                        key={l}
                        className="flex items-center gap-2 rounded-xl border border-glass-stroke bg-[rgba(12,16,24,.72)] px-2.5 py-2 backdrop-blur-md"
                      >
                        <TrendingUp className="h-3.5 w-3.5 text-lime" />
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-text-low">{l}</span>
                        <span className="font-mono text-sm font-semibold text-white">{v}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      {/* controles */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-glass-stroke bg-white/[0.045] text-text-hi transition hover:border-cyan hover:shadow-[0_0_20px_-6px_var(--cyan)]"
        >
          <ChevronLeft className="h-[18px] w-[18px]" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-current={i === safe}
              aria-label={`Ir al creativo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-pill transition-all ${i === safe ? "w-[26px] bg-cyan" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="grid h-11 w-11 place-items-center rounded-full border border-glass-stroke bg-white/[0.045] text-text-hi transition hover:border-cyan hover:shadow-[0_0_20px_-6px_var(--cyan)]"
        >
          <ChevronRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
