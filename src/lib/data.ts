export type Slide = {
  id: string;
  niche: "Moda" | "Tech" | "Fitness" | "Ecommerce";
  creator: string;
  verified: boolean;
  metrics: [string, string][];
};

export const NICHES = ["Todos", "Moda", "Tech", "Fitness", "Ecommerce"] as const;
export type Niche = (typeof NICHES)[number];

export const PLANS: Record<number, number> = { 4: 299, 8: 499, 16: 849 };

export const SLIDES: Slide[] = [
  { id: "1", niche: "Tech", creator: "@lauravisuals", verified: true, metrics: [["CTR", "4.8%"], ["ROAS", "3.9x"], ["Views", "1.2M"]] },
  { id: "2", niche: "Fitness", creator: "@marco.fit", verified: true, metrics: [["CTR", "6.1%"], ["ROAS", "5.2x"], ["Views", "840K"]] },
  { id: "3", niche: "Moda", creator: "@sofiawears", verified: false, metrics: [["CTR", "3.4%"], ["Hook", "41%"], ["Views", "560K"]] },
  { id: "4", niche: "Ecommerce", creator: "@thedailycart", verified: true, metrics: [["CTR", "5.5%"], ["ROAS", "4.4x"], ["Views", "2.0M"]] },
  { id: "5", niche: "Tech", creator: "@buildwithkev", verified: true, metrics: [["CTR", "4.0%"], ["ROAS", "3.1x"], ["Views", "430K"]] },
  { id: "6", niche: "Fitness", creator: "@nadia.moves", verified: true, metrics: [["CTR", "5.7%"], ["ROAS", "4.8x"], ["Views", "910K"]] },
];

export const NICHE_GRADIENT: Record<Slide["niche"], string> = {
  Moda: "linear-gradient(135deg,#ff8fb0,#7c5cff 60%,#2dd4e8)",
  Tech: "linear-gradient(135deg,#2dd4e8,#3b56ff 55%,#0b1020)",
  Fitness: "linear-gradient(135deg,#b6f03c,#2dd4e8 60%,#7c5cff)",
  Ecommerce: "linear-gradient(135deg,#ffb457,#ff6b8a 55%,#7c5cff)",
};

export const CMP_ROWS: [string, string, string][] = [
  ["Coste por creativo", "$90–150", "$31–75 (según plan)"],
  ["Flujo de entrega", "Puntual, se agota", "4 / 8 / 16 cada mes, en automático"],
  ["Tiempo de gestión", "Re-cotizar y re-briefear cada vez", "Brief una vez, iteración continua"],
  ["Métricas de rendimiento", "No incluidas", "CTR, hook rate y ROAS por creativo"],
  ["Créditos no usados", "Se pierden", "Se acumulan hasta 60 días"],
  ["Escala de testing", "Lenta, 1–2 ángulos", "Constante, 4–16 ángulos nuevos/mes"],
  ["Permanencia", "—", "Sin contrato · pausa o cambia de plan"],
];

export const TESTIMONIALS = [
  { q: "Pasamos de lanzar 2 creativos al mes a 12. Encontramos un ganador en la tercera semana y bajó nuestro CPA un 34%.", nm: "Elena Ruiz", rl: "Head of Growth · Nuvē Skincare", st: "CPA −34%", i: "E" },
  { q: "El ahorro es real, pero lo que nos convenció fue el reporte de hook rate. Dejamos de adivinar qué funciona.", nm: "Tomás Iglesias", rl: "Performance Lead · Kettel", st: "ROAS 2.1x → 3.8x", i: "T" },
  { q: "Los créditos acumulables nos salvaron en temporada baja: guardamos y lanzamos todo antes del Black Friday.", nm: "Priya Nair", rl: "Founder · Loop Activewear", st: "+18 creativos en Q4", i: "P" },
  { q: "Creadores verificados de verdad. La calidad es consistente, no la lotería de contratar freelancers sueltos.", nm: "Mark Vidal", rl: "Media Buyer · agencia Fold", st: "7 cuentas escalando", i: "M" },
  { q: "Onboarding en 48h. El primer batch entró antes de lo que tardaba mi proveedor anterior en responder el email.", nm: "Sara Bennett", rl: "CMO · Håndverk Coffee", st: "48h al primer drop", i: "S" },
  { q: "Cambiamos de plan tres veces según la temporada sin fricción. Es la flexibilidad que Meta te exige tener.", nm: "Diego Fuentes", rl: "Ecommerce Manager · Terra", st: "3 cambios de plan, 0 fricción", i: "D" },
];

export const FAQS: [string, string][] = [
  ["¿Cuándo recibo mis primeros videos?", "El onboarding dura 48 horas: defines marca, producto y ángulos en un brief guiado. El primer batch se entrega dentro de los primeros 7 días del ciclo, y el resto se reparte a lo largo del mes para que tengas flujo constante, no todo de golpe."],
  ["¿De quién son los derechos de uso de los creativos?", "Tuyos, a perpetuidad. Cada creativo entregado incluye licencia comercial completa para paid y orgánico en todas las plataformas, sin límite de tiempo ni de spend. Los creadores firman cesión de derechos antes de publicar. Recibes también los archivos fuente en 9:16, 1:1 y 4:5."],
  ["¿Qué pasa con los creativos que no uso este mes?", "Se acumulan. Los créditos no consumidos se guardan hasta 60 días, así que puedes ahorrar durante una temporada baja y liberar todo antes de un lanzamiento o del Black Friday. Si cancelas, tienes 30 días para reclamar los créditos pendientes."],
  ["¿Puedo pausar o cambiar de plan?", "Sí, desde tu panel y sin hablar con nadie. Pausa hasta 3 meses conservando tus créditos, o sube y baja de plan en cualquier ciclo. Los cambios de plan aplican en la siguiente factura y no hay penalización."],
  ["¿Qué incluye el reporte de rendimiento?", "Para cada creativo entregado registramos CTR, hook rate (retención a 3s), thumb-stop ratio y, si conectas tu cuenta de Meta o TikTok vía API, el ROAS real. Cada mes recibes un resumen con los ángulos ganadores para que el siguiente batch itere sobre lo que ya funciona."],
  ["¿Y si un creativo no me convence?", "Cada entrega incluye una ronda de revisión sin coste (ajustes de hook, texto, ritmo o CTA). Si aun así no encaja con tu marca, lo reemplazamos y no consume crédito. Nuestro objetivo es tu tasa de aprobación, no cerrar tickets."],
];

export const PRICING = [
  { tag: "Starter", price: "$299", per: "/mes", featured: false, cta: "Empezar", features: ["4 creativos UGC / mes", "1 ronda de revisión por video", "Formatos 9:16 · 1:1 · 4:5", "Reporte de CTR y hook rate"] },
  { tag: "Growth · más elegido", price: "$499", per: "/mes · $62 por video", featured: true, cta: "Empezar mi suscripción →", features: ["8 creativos UGC / mes", "Todo lo de Starter", "Conexión API Meta / TikTok (ROAS real)", "Resumen mensual de ángulos ganadores"] },
  { tag: "Scale", price: "$849", per: "/mes · $53 por video", featured: false, cta: "Empezar", features: ["16 creativos UGC / mes", "Todo lo de Growth", "Creadores verificados prioritarios", "Sesión estratégica de creativos mensual"] },
];
