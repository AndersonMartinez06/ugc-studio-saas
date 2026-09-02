"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HERO_SALES } from "@/lib/data";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-PE");

export default function SalesCard() {
  const reduce = useReducedMotion();
  const [total, setTotal] = useState(1240);
  const [orders, setOrders] = useState(18);
  const [sale, setSale] = useState(HERO_SALES[0]);
  const [toastKey, setToastKey] = useState(0);
  const [bumpKey, setBumpKey] = useState(0);
  const idx = useRef(0);

  useEffect(() => {
    if (reduce) {
      setToastKey(1);
      return;
    }
    const tick = () => {
      const s = HERO_SALES[idx.current % HERO_SALES.length];
      idx.current += 1;
      setSale(s);
      setToastKey((k) => k + 1);
      setTotal((t) => {
        const next = t + s.amount;
        if (next > 2400) {
          setOrders(16 + Math.round(Math.random() * 4));
          return 1180 + Math.round(Math.random() * 80);
        }
        setOrders((o) => o + 1);
        return next;
      });
      setBumpKey((k) => k + 1);
    };
    tick();
    const id = setInterval(tick, 3400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="pointer-events-none absolute -inset-[18%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(229,48,143,0.3),rgba(124,92,255,0.12)_45%,transparent_72%)] blur-[38px]" />

      <div className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-[linear-gradient(165deg,#1f1a2c,#120e1c)] p-5 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-1.5 pb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="ml-auto font-mono text-[0.68rem] uppercase tracking-[0.08em] text-text-mid">
            Tu tienda
          </span>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-line bg-white/[0.035] p-[18px]">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.11em] text-text-mid">
            Ventas de hoy
          </span>
          <span
            key={bumpKey}
            className="inline-block font-display text-[2.1rem] font-extrabold tabular-nums tracking-[-0.035em] text-text-hi motion-safe:animate-bump"
          >
            {fmt(total)}
          </span>
          <svg viewBox="0 0 120 36" preserveAspectRatio="none" className="h-[34px] w-full">
            <polyline
              points="0,30 14,26 28,28 42,18 56,20 70,10 84,13 98,5 112,8 120,4"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-white/[0.035] px-3.5 py-3">
            <span className="font-display text-[1.25rem] font-extrabold tabular-nums tracking-[-0.03em]">
              {orders}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.09em] text-text-mid">
              Pedidos hoy
            </span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-xl border border-line bg-white/[0.035] px-3.5 py-3">
            <span className="font-display text-[1.25rem] font-extrabold tabular-nums tracking-[-0.03em]">
              4.2%
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.09em] text-text-mid">
              Conversión
            </span>
          </div>
        </div>

        <div
          key={toastKey}
          className={`flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 p-3 ${
            reduce ? "" : "animate-toast"
          }`}
        >
          <span className="text-[1.25rem] leading-none">{sale.icon}</span>
          <div className="flex min-w-0 flex-col">
            <strong className="text-[0.83rem] font-bold">{sale.title}</strong>
            <span className="truncate font-mono text-[0.72rem] text-text-mid">{sale.detail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
