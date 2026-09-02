import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#06070C",
        surface: "#0C1018",
        cyan: "#2DD4E8",
        violet: "#7C5CFF",
        lime: "#B6F03C",
        rose: "#FF6B8A",
        "text-hi": "#EEF1FA",
        "text-mid": "#98A1BC",
        "text-low": "#59627A",
        "glass-stroke": "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "22px",
        pill: "999px",
      },
      backgroundImage: {
        grad: "linear-gradient(115deg,#2DD4E8,#7C5CFF)",
      },
      keyframes: {
        pulse2: { "50%": { opacity: "0.35", transform: "scale(0.8)" } },
        drift: { from: { backgroundPosition: "0% 0%" }, to: { backgroundPosition: "100% 100%" } },
        scrub: { from: { width: "4%" }, to: { width: "100%" } },
        spin360: { to: { "--angle": "360deg" } },
      },
      animation: {
        pulse2: "pulse2 2s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite alternate",
        scrub: "scrub 6s linear infinite",
        spin360: "spin360 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
