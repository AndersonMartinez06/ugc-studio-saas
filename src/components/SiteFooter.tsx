import { Instagram, MessageCircle } from "lucide-react";
import { NAV_LINKS, waLink, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/data";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-6 pb-10 pt-16">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 min-[1920px]:max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]">
            Creativ<span className="text-accent">ia</span>
          </span>
          <p className="mt-3 max-w-[34ch] text-[0.9rem] text-text-mid">
            Videos VSL, UGC, POV y con IA para tiendas online. Guion, producción y edición, todo
            incluido.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-[0.9rem] font-bold">Navegación</h4>
          <div className="flex flex-col gap-2 text-[0.9rem] text-text-mid">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-text-hi">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-display text-[0.9rem] font-bold">Contacto</h4>
          <div className="flex flex-col gap-2 text-[0.9rem] text-text-mid">
            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-text-hi"
            >
              <MessageCircle className="h-4 w-4 text-wa" />
              {WHATSAPP_PRETTY}
            </a>
            <a href="#contacto" className="hover:text-text-hi">
              Formulario de contacto
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-display text-[0.9rem] font-bold">Síguenos</h4>
          <div className="flex gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-text-low"
              title="Muy pronto en Instagram"
            >
              <Instagram className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-[0.8rem] text-text-low">Muy pronto en redes</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1120px] border-t border-line pt-6 text-[0.82rem] text-text-low min-[1920px]:max-w-[1440px]">
        © {year} Creativia. Videos que venden.
      </div>
    </footer>
  );
}
