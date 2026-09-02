import { MessageCircle } from "lucide-react";
import { waLink, WA_DEFAULT } from "@/lib/data";

export default function WhatsappFab() {
  return (
    <a
      href={waLink(WA_DEFAULT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-[84px] right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-[#04250f] shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition hover:brightness-105 md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
