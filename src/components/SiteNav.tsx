"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, waLink, WA_DEFAULT } from "@/lib/data";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? "border-line bg-void/85 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="shell flex h-[64px] items-center justify-between gap-5">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]"
        >
          Creativ<span className="text-accent">ia</span>
        </a>

        <ul className="hidden flex-1 justify-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="border-b border-transparent pb-0.5 text-sm font-medium text-text-mid transition-colors hover:border-accent hover:text-text-hi"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={waLink(WA_DEFAULT)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-line px-4 py-2 text-[0.87rem] font-semibold text-text-hi transition hover:border-accent hover:bg-accent/[0.07]"
          >
            Contacto
          </a>
          <a
            href="#precios"
            className="rounded-pill bg-accent px-[18px] py-2 text-[0.87rem] font-semibold text-white shadow-[0_6px_22px_-6px_rgba(229,48,143,0.6)] transition hover:brightness-110"
          >
            Ver planes
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-lg text-text-hi md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-void/95 backdrop-blur-xl md:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[0.95rem] font-medium text-text-mid hover:bg-white/[0.04] hover:text-text-hi"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-pill btn-wa px-5 py-3 text-center font-semibold"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
