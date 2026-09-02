/* =========================================================
   Creativia × Scrollstop — contenido de la landing unificada
   ========================================================= */

/* ---------------- contacto ---------------- */
export const WHATSAPP = "51998987079";
export const WHATSAPP_PRETTY = "+51 998 987 079";
export const CONTACT_EMAIL = "garciamarce0307@gmail.com";
export const BRAND = "Creativia";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const WA_DEFAULT = "Hola Creativia, quiero cotizar videos para mi tienda";

/* ---------------- navegación ---------------- */
export const NAV_LINKS = [
  { href: "#formatos", label: "Formatos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

/* ---------------- carrusel 3D (showcase) ---------------- */
export type Slide = {
  id: string;
  niche: "Moda" | "Tech" | "Fitness" | "Ecommerce";
  creator: string;
  verified: boolean;
  /** MP4 en bucle. Assets de ejemplo de libre uso (Cloudinary demo, test-videos.co.uk, MDN CC0). */
  src: string;
  poster?: string;
  metrics: [string, string][];
};

export const NICHES = ["Todos", "Moda", "Tech", "Fitness", "Ecommerce"] as const;
export type Niche = (typeof NICHES)[number];

const CLD = "https://res.cloudinary.com/demo/video/upload";
const TV = "https://test-videos.co.uk/vids";

export const SLIDES: Slide[] = [
  {
    id: "1", niche: "Tech", creator: "@lauravisuals", verified: true,
    src: `${CLD}/q_auto/dog.mp4`,
    poster: `${CLD}/so_1,w_640,h_1136,c_fill/dog.jpg`,
    metrics: [["CTR", "4.8%"], ["ROAS", "3.9x"], ["Views", "1.2M"]],
  },
  {
    id: "2", niche: "Fitness", creator: "@marco.fit", verified: true,
    src: `${CLD}/q_auto/elephants.mp4`,
    poster: `${CLD}/so_2,w_640,h_1136,c_fill/elephants.jpg`,
    metrics: [["CTR", "6.1%"], ["ROAS", "5.2x"], ["Views", "840K"]],
  },
  {
    id: "3", niche: "Moda", creator: "@sofiawears", verified: false,
    src: `${TV}/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4`,
    metrics: [["CTR", "3.4%"], ["Hook", "41%"], ["Views", "560K"]],
  },
  {
    id: "4", niche: "Ecommerce", creator: "@thedailycart", verified: true,
    src: `${TV}/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4`,
    metrics: [["CTR", "5.5%"], ["ROAS", "4.4x"], ["Views", "2.0M"]],
  },
  {
    id: "5", niche: "Tech", creator: "@buildwithkev", verified: true,
    src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
    metrics: [["CTR", "4.0%"], ["ROAS", "3.1x"], ["Views", "430K"]],
  },
  {
    id: "6", niche: "Fitness", creator: "@nadia.moves", verified: true,
    src: `${TV}/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4`,
    metrics: [["CTR", "5.7%"], ["ROAS", "4.8x"], ["Views", "910K"]],
  },
];

export const NICHE_GRADIENT: Record<Slide["niche"], string> = {
  Moda: "linear-gradient(135deg,#ff8fb0,#e5308f 55%,#7c5cff)",
  Tech: "linear-gradient(135deg,#7c5cff,#e5308f 55%,#1a0e1f)",
  Fitness: "linear-gradient(135deg,#22d3ee,#7c5cff 55%,#e5308f)",
  Ecommerce: "linear-gradient(135deg,#ffb457,#e5308f 55%,#7c5cff)",
};

/* ---------------- hero ---------------- */
export const MARQUEE_ITEMS = ["VSL", "UGC", "POV", "Con IA", "Respuesta TikTok", "Autoridad"];

export const HERO_STATS: { icon: "clock" | "zap" | "refresh" | "target"; strong: string; label: string }[] = [
  { icon: "clock", strong: "5 a 10 días", label: "Entrega total del proyecto" },
  { icon: "zap", strong: "Estudio de mercado", label: "Incluido en todos los planes" },
  { icon: "refresh", strong: "Revisiones", label: "Incluidas hasta tu aprobación" },
  { icon: "target", strong: "Listo para pauta", label: "Optimizado para Meta & TikTok" },
];

export const HERO_SALES = [
  { icon: "🛍️", title: "Nueva venta", detail: "Tienda Aurora · $89.90", amount: 89.9 },
  { icon: "📦", title: "Pedido confirmado", detail: "Casa Nova · $54.00", amount: 54 },
  { icon: "💳", title: "Pago aprobado", detail: "Bella Store · $132.50", amount: 132.5 },
  { icon: "🚀", title: "Nueva venta", detail: "Urban Fit · $76.20", amount: 76.2 },
];

/* ---------------- formatos ---------------- */
export type FormatId = "vsl" | "ugc" | "pov" | "ia" | "tiktok" | "autoridad";
export const FORMATS: { id: FormatId; label: string; title: string; desc: string }[] = [
  { id: "vsl", label: "VSL", title: "VSL", desc: "Video de venta que explica tu producto y cierra como lo haría tu mejor vendedor, cara a cara." },
  { id: "ugc", label: "UGC", title: "UGC", desc: "Contenido estilo creador, natural y auténtico, que genera la confianza de una recomendación real." },
  { id: "pov", label: "POV", title: "POV", desc: "Formato en primera persona que engancha desde el segundo uno y se siente nativo del feed." },
  { id: "ia", label: "Con IA", title: "Con IA", desc: "Avatares y voces con IA para escalar producción sin depender de grabaciones físicas." },
  { id: "tiktok", label: "Respuesta TikTok", title: "Respuesta TikTok", desc: "Formato tipo reply que aprovecha tendencias y comentarios virales para darle visibilidad a tu marca." },
  { id: "autoridad", label: "Autoridad", title: "Autoridad", desc: "Contenido que posiciona a tu marca como experta en su rubro y genera confianza antes de la compra." },
];

/* ---------------- proceso ---------------- */
export const PROCESS_STEPS = [
  { day: "Día 01", title: "Nos cuentas tu marca", desc: "Completas un brief simple con tu producto, objetivos y referencias." },
  { day: "Día 01–02", title: "Estudio de mercado y guion", desc: "Analizamos tu competencia y armamos guiones pensados para vender." },
  { day: "Día 03–06", title: "Producción", desc: "Grabamos y generamos el contenido según el formato elegido." },
  { day: "Día 07–08", title: "Edición", desc: "Sumamos subtítulos, música y ritmo para que el video enganche." },
  { day: "Día 09–10", title: "Entrega", desc: "Recibes tus videos listos para publicar o subir a pauta." },
];

/* ---------------- calculadora ROI (re-enfocada a paquetes) ---------------- */
export const ROI_PACKS = [
  { label: "Starter", videos: 22, price: 99 },
  { label: "Growth", videos: 32, price: 199 },
  { label: "Scale", videos: 42, price: 299 },
];

/* ---------------- comparativa: hazlo tú vs. Creativia ---------------- */
export const CMP_ROWS: [string, string, string][] = [
  ["Guion y estudio de mercado", "Lo resuelves tú o un freelance aparte", "Incluido en todos los planes"],
  ["Tiempo hasta el primer video", "Semanas: buscar, contratar, coordinar", "5 a 10 días hábiles por todo el lote"],
  ["Coste por video", "$90–150 por freelance, sin volumen", "Desde ~$7 por video en el plan Scale"],
  ["Consistencia de calidad", "Varía según quién grabe ese día", "Mismo equipo, mismo estándar"],
  ["Revisiones", "Se pagan aparte o se negocian", "Incluidas hasta tu aprobación"],
  ["Formatos disponibles", "Uno o dos que domine el freelance", "VSL, UGC, POV, IA, Respuesta TikTok y Autoridad"],
  ["Derechos de uso", "Depende del contrato", "Tuyos, sin marca de agua ni límite de pauta"],
];

/* ---------------- compromisos ---------------- */
export const PROMISES = [
  { idx: "01", title: "No apruebas, no avanzamos", desc: "Cada etapa pasa por tu visto bueno: primero el guion, después los crudos y al final el video editado. Nada se produce a ciegas." },
  { idx: "02", title: "El plazo es un compromiso", desc: "De 5 a 10 días hábiles desde tu brief. Si algo se retrasa de nuestro lado, te avisamos antes de que la fecha llegue, no después." },
  { idx: "03", title: "Los archivos son tuyos", desc: "Te entregamos los videos finales listos para pauta, sin marcas de agua y sin límite de uso en tus campañas y redes." },
];

/* ---------------- precios ---------------- */
export type Package = {
  tag: string;
  price: string;
  range: string;
  featured: boolean;
  features: string[];
  waText: string;
};

export const PACKAGES: Package[] = [
  {
    tag: "Starter", price: "$99", range: "20 a 25 videos", featured: false,
    features: ["Estudio de mercado incluido", "Guion y edición incluidos", "Revisiones hasta tu aprobación", "Entrega en 5 a 10 días"],
    waText: "Hola Creativia, me interesa el plan Starter de $99 (20 a 25 videos)",
  },
  {
    tag: "Growth", price: "$199", range: "30 a 35 videos", featured: true,
    features: ["Todo lo del plan Starter", "Landing page incluida", "Estudio de mercado incluido", "Entrega en 5 a 10 días"],
    waText: "Hola Creativia, me interesa el plan Growth de $199 (30 a 35 videos + landing)",
  },
  {
    tag: "Scale", price: "$299", range: "40 a 45 videos", featured: false,
    features: ["Todo lo del plan Growth", "Landing page incluida", "Mayor volumen mensual", "Entrega en 5 a 10 días"],
    waText: "Hola Creativia, me interesa el plan Scale de $299 (40 a 45 videos + landing)",
  },
  {
    tag: "A tu medida", price: "Hablemos", range: "Volumen y condiciones a convenir", featured: false,
    features: ["Volumen a medida", "Condiciones a convenir", "Ideal para agencias y marcas grandes"],
    waText: "Hola Creativia, quiero armar un plan a medida",
  },
];

export type Subscription = {
  tag: string;
  price: string;
  per: string;
  featured: boolean;
  plan: "starter" | "growth" | "scale";
  features: string[];
  waText: string;
};

export const SUBSCRIPTIONS: Subscription[] = [
  {
    tag: "Starter", price: "$299", per: "/ mes", featured: false, plan: "starter",
    features: ["4 creativos nuevos / mes", "1 ronda de revisión por video", "Formatos 9:16 · 1:1 · 4:5", "Reporte de CTR y hook rate"],
    waText: "Hola Creativia, me interesa la suscripción Starter de $299/mes (4 creativos)",
  },
  {
    tag: "Growth", price: "$499", per: "/ mes · $62 por video", featured: true, plan: "growth",
    features: ["8 creativos nuevos / mes", "Todo lo de Starter", "Conexión API Meta / TikTok (ROAS real)", "Resumen mensual de ángulos ganadores"],
    waText: "Hola Creativia, me interesa la suscripción Growth de $499/mes (8 creativos)",
  },
  {
    tag: "Scale", price: "$849", per: "/ mes · $53 por video", featured: false, plan: "scale",
    features: ["16 creativos nuevos / mes", "Todo lo de Growth", "Creadores verificados prioritarios", "Sesión estratégica de creativos mensual"],
    waText: "Hola Creativia, me interesa la suscripción Scale de $849/mes (16 creativos)",
  },
];

/* ---------------- FAQ (fusión de ambos proyectos) ---------------- */
export const FAQS: [string, string][] = [
  ["¿Qué pasa si no me gusta el resultado?", "Tienes revisiones incluidas en todos los planes. Ajustamos guion, edición o enfoque hasta que el video quede aprobado por ti. Si un creativo no encaja con tu marca, lo reemplazamos sin coste."],
  ["¿Necesito grabar algo yo?", "No es necesario. Trabajamos con avatares y voces con IA, además de formatos UGC y POV producidos por nuestro equipo. Si quieres aportar material propio, también lo podemos usar."],
  ["¿Qué incluye el estudio de mercado?", "Analizamos tu competencia, tu público objetivo y los ganchos que mejor funcionan en tu rubro antes de escribir cualquier guion."],
  ["¿De quién son los derechos de uso de los videos?", "Tuyos, a perpetuidad. Los entregamos sin marca de agua y sin límite de uso en tus campañas de pauta y redes, con los archivos fuente en vertical y horizontal."],
  ["¿Cuál es la diferencia entre paquete único y suscripción?", "El paquete único es un lote de videos que pides una sola vez — ideal para arrancar o para una campaña puntual. La suscripción entrega creativos nuevos cada mes de forma constante, pensada para escalar pauta sin quedarte sin material."],
  ["¿En qué formato entregan los videos?", "Verticales u horizontales según el uso, listos para subir directo a Meta Ads, TikTok Ads o tus redes."],
  ["¿Puedo pedir más videos o cambiar de plan después?", "Sí. En la suscripción subes o bajas de plan cuando quieras. En paquetes, escríbenos por WhatsApp y armamos uno a tu medida según cuánto necesites escalar."],
  ["¿Cuándo recibo el primer video?", "El primer lote se entrega dentro de los primeros días del proyecto; el resto se reparte a lo largo del plazo para que tengas flujo constante, no todo de golpe."],
];
