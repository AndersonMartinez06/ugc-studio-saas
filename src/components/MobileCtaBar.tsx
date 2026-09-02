import { waLink, WA_DEFAULT } from "@/lib/data";

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-void/90 p-3 backdrop-blur-xl md:hidden">
      <a
        href={waLink(WA_DEFAULT)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa flex-1 rounded-pill px-5 py-3 text-center font-display text-sm font-bold"
      >
        WhatsApp
      </a>
      <a
        href="#precios"
        className="flex-1 rounded-pill border border-line bg-white/[0.04] px-5 py-3 text-center font-display text-sm font-bold text-text-hi"
      >
        Ver planes
      </a>
    </div>
  );
}
