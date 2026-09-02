import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08070E",
        surface: "#14111D",
        accent: "#E5308F",
        "accent-soft": "#F472B6",
        violet: "#7C5CFF",
        data: "#22D3EE",
        rose: "#FB7185",
        wa: "#25D366",
        "text-hi": "#F4F2F7",
        "text-mid": "#9A94A8",
        "text-low": "#5B5568",
        line: "#262231",
        "glass-stroke": "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      backgroundImage: {
        grad: "linear-gradient(120deg,#E5308F,#7C5CFF)",
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
