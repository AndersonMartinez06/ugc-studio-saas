"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, waLink, WA_DEFAULT, WHATSAPP_PRETTY } from "@/lib/data";
import { Reveal } from "./Section";

const FIELDS = [
  { name: "Nombre", label: "Nombre", type: "text", required: true, placeholder: "Tu nombre" },
  { name: "Marca", label: "Tienda / Marca", type: "text", required: false, placeholder: "Nombre de tu tienda" },
  { name: "Email", label: "Email", type: "email", required: true, placeholder: "tu@email.com" },
  { name: "WhatsApp", label: "WhatsApp", type: "tel", required: false, placeholder: "+51 9..." },
];

export default function Contact() {
  return (
    <section id="contacto" className="px-6 py-[clamp(72px,11vw,128px)]">
      <div className="mx-auto max-w-[1120px] min-[1920px]:max-w-[1440px] min-[2560px]:max-w-[1680px]">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-soft">
              Hablemos
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold">
              Cuéntanos sobre tu marca
            </h2>
            <p className="mt-3.5 max-w-[36ch] text-[1.03rem] text-text-mid">
              Respondemos rápido. Elige la vía que prefieras.
            </p>
            <a
              href={waLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-6 inline-flex items-center gap-2 rounded-pill px-7 py-4 font-display text-[1rem] font-bold"
            >
              <MessageCircle className="h-[19px] w-[19px]" />
              {WHATSAPP_PRETTY}
            </a>
          </div>

          <form
            action={`https://formsubmit.co/${CONTACT_EMAIL}`}
            method="POST"
            className="glass flex flex-col gap-4 rounded-card p-6 sm:p-8"
          >
            <input type="hidden" name="_subject" value="Nuevo contacto desde la web de Creativia" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            {FIELDS.map((f) => (
              <label key={f.name} className="flex flex-col gap-1.5 text-[0.86rem] text-text-mid">
                {f.label}
                {f.required && <span className="sr-only"> (obligatorio)</span>}
                <input
                  type={f.type}
                  name={f.name}
                  required={f.required}
                  placeholder={f.placeholder}
                  className="rounded-xl border border-line bg-white/[0.03] px-3.5 py-3 text-[0.95rem] text-text-hi outline-none transition placeholder:text-text-low focus:border-accent"
                />
              </label>
            ))}

            <label className="flex flex-col gap-1.5 text-[0.86rem] text-text-mid">
              Cuéntanos sobre tu proyecto
              <textarea
                name="Mensaje"
                rows={4}
                placeholder="¿Qué tipo de videos necesitas?"
                className="resize-y rounded-xl border border-line bg-white/[0.03] px-3.5 py-3 text-[0.95rem] text-text-hi outline-none transition placeholder:text-text-low focus:border-accent"
              />
            </label>

            <button
              type="submit"
              className="mt-1 rounded-pill bg-accent px-6 py-4 font-display text-[1rem] font-bold text-white shadow-[0_8px_26px_-8px_rgba(229,48,143,0.6)] transition hover:brightness-110"
            >
              Enviar mensaje
            </button>
            <p className="text-center text-[0.78rem] text-text-low">Te contactaremos a la brevedad.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
