"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Play, TrendingUp } from "lucide-react";
import { NICHES, SLIDES, NICHE_GRADIENT, type Niche, type Slide } from "@/lib/data";

/* ---------- hook: ¿viewport móvil? (SSR-safe) ---------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isMobile;
}

/* ---------- media interna de una tarjeta ---------- */
function CardMedia({
  slide,
  playing,
  reduce,
  showPlayIcon,
}: {
  slide: Slide;
  playing: boolean;
  reduce: boolean;
  showPlayIcon: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing && !reduce) {
      v.play().catch(() => {});
    } else {
      v.pause();
      if (!playing) v.currentTime = 0;
    }
  }, [playing, reduce]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-card">
      <div className="absolute inset-0" style={{ backgroundImage: NICHE_GRADIENT[slide.niche] }} />
      <video
        ref={videoRef}
        src={slide.src}
        poster={slide.poster}
        muted
        loop
        playsInline
        preload={playing ? "metadata" : "none"}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,.05)_0_1px,transparent_1px_4px)]" />

      {showPlayIcon && (
        <div className="absolute inset-0 m-auto grid h-[54px] w-[54px] place-items-center rounded-full border border-white/30 bg-void/50 backdrop-blur-sm">
          <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
        </div>
      )}

      <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-pill border border-white/15 bg-void/55 px-2 py-1 text-xs text-white backdrop-blur">
        <span>{slide.creator}</span>
        {slide.verified && <BadgeCheck className="h-3.5 w-3.5 text-cyan" />}
      </div>
      <div className="absolute right-2.5 top-2.5 rounded-pill bg-violet/70 px-2 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
        {slide.niche}
      </div>

      <div className="absolute inset-x-3 bottom-3 h-[3px] overflow-hidden rounded-sm bg-white/20">
        <i
          className={`block h-full bg-cyan shadow-[0_0_10px_var(--cyan)] ${
            playing ? "motion-safe:animate-scrub" : "w-[38%]"
          }`}
        />
      </div>
    </div>
  );
}

function MetricsBadges({ slide, inside }: { slide: Slide; inside?: boolean }) {
  return (
    <div
      className={
        inside
          ? "absolute bottom-8 left-2 flex flex-col items-start gap-1.5"
          : "absolute -right-3.5 bottom-14 flex flex-col gap-2"
      }
      aria-hidden
    >
      {slide.metrics.map(([l, v]) => (
        <div
          key={l}
          className="flex items-center gap-1.5 rounded-xl border border-glass-stroke bg-[rgba(12,16,24,.78)] px-2 py-1.5 backdrop-blur-md"
        >
          <TrendingUp className="h-3 w-3 text-lime" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-text-low">{l}</span>
          <span className="font-mono text-xs font-semibold text-white">{v}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- tarjeta del abanico 3D (desktop) ---------- */
function FanCard({
  slide,
  offset,
  reduce,
  onSelect,
}: {
  slide: Slide;
  offset: number;
  reduce: boolean;
  onSelect: () => void;
}) {
  const abs = Math.abs(offset);
  const active = offset === 0;
  const transform = reduce
    ? `translateX(${offset * 130}px) scale(${active ? 1 : 0.82})`
    : `translateX(${offset * 230}px) translateZ(${-abs * 260}px) rotateY(${offset * -24}deg) scale(${1 - abs * 0.12})`;

  return (
    <article
      className="glow-border absolute w-[300px] cursor-pointer rounded-card [transform-style:preserve-3d] motion-safe:transition-[transform,opacity] motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ transform, opacity: reduce ? (active ? 1 : 0.4) : 1 - abs * 0.32, zIndex: 10 - abs }}
      onClick={() => !active && onSelect()}
      aria-hidden={!active}
    >
      <div
        className={`overflow-hidden rounded-card border border-glass-stroke bg-surface transition-transform duration-300 ${
          active
            ? "shadow-[0_0_0_1px_rgba(45,212,232,.5),0_0_34px_-6px_rgba(45,212,232,.5),0_0_70px_-12px_rgba(124,92,255,.45)] hover:scale-[1.02]"
            : "shadow-[0_40px_90px_-50px_#000]"
        }`}
      >
        <CardMedia slide={slide} playing={active} reduce={reduce} showPlayIcon={!active} />
      </div>
      {active && <MetricsBadges slide={slide} />}
    </article>
  );
}

/* ---------- carrusel móvil: tira con scroll-snap ---------- */
function MobileStrip({
  slides,
  reduce,
  activeIndex,
  setActiveIndex,
  scrollerRef,
}: {
  slides: Slide[];
  reduce: boolean;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  scrollerRef: RefObject<HTMLDivElement>;
}) {
  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActiveIndex(best);
  }, [scrollerRef, setActiveIndex]);

  return (
    <div
      ref={scrollerRef}
      onScroll={onScroll}
      className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14%] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((s, i) => (
        <article
          key={s.id}
          className="glow-border relative w-[72%] shrink-0 snap-center rounded-card border border-glass-stroke bg-surface shadow-[0_30px_70px_-45px_#000]"
        >
          <CardMedia
            slide={s}
            playing={i === activeIndex}
            reduce={reduce}
            showPlayIcon={i !== activeIndex}
          />
          {i === activeIndex && <MetricsBadges slide={s} inside />}
        </article>
      ))}
    </div>
  );
}

/* ---------- componente principal ---------- */
export default function UgcCarousel() {
  const reduce = !!useReducedMotion();
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<Niche>("Todos");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(
    () => (filter === "Todos" ? SLIDES : SLIDES.filter((s) => s.niche === filter)),
    [filter],
  );
  const len = slides.length;
  const safe = ((index % len) + len) % len;

  const go = useCallback(
    (d: number) => {
      if (isMobile) {
        const el = scrollerRef.current;
        if (!el) return;
        const target = el.children[safe + d] as HTMLElement | undefined;
        target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
      } else {
        setIndex((i) => i + d);
      }
    },
    [isMobile, safe, reduce],
  );

  const goTo = useCallback(
    (i: number) => {
      if (isMobile) {
        const el = scrollerRef.current;
        const target = el?.children[i] as HTMLElement | undefined;
        target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
      } else {
        setIndex(i);
      }
    },
    [isMobile, reduce],
  );

  // autoplay solo en desktop
  useEffect(() => {
    if (isMobile || paused || reduce || len <= 1) return;
    const t = setInterval(() => setIndex((i) => i + 1), 6000);
    return () => clearInterval(t);
  }, [isMobile, paused, reduce, len]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
                scrollerRef.current?.scrollTo({ left: 0 });
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

      {isMobile ? (
        <div className="mt-6">
          <MobileStrip
            slides={slides}
            reduce={reduce}
            activeIndex={safe}
            setActiveIndex={setIndex}
            scrollerRef={scrollerRef}
          />
        </div>
      ) : (
        <div
          className="relative mt-5 flex h-[540px] items-center justify-center min-[1920px]:h-[600px]"
          style={{ perspective: reduce ? undefined : "1700px" }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 h-32 blur-lg [background:radial-gradient(ellipse_at_center,rgba(124,92,255,.28),transparent_70%)]" />
          {slides.map((s, i) => {
            let off = i - safe;
            if (off > len / 2) off -= len;
            if (off < -len / 2) off += len;
            if (Math.abs(off) > 2) return null;
            return (
              <FanCard
                key={s.id}
                slide={s}
                offset={off}
                reduce={reduce}
                onSelect={() => setIndex(index + off)}
              />
            );
          })}
        </div>
      )}

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
              onClick={() => goTo(i)}
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
