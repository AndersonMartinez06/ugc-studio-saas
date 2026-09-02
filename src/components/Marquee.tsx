import { MARQUEE_ITEMS } from "@/lib/data";

export default function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-6 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-text-mid">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            {item}
            <span className="text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
