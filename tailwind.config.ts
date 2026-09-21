import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        velvet: "#2B0A12",
        oxblood: "#4A0F1D",
        gold: {
          champagne: "#E6C9A0",
          soft: "#C9A56B",
        },
        cream: "#F6EEE3",
        pistachio: "#B8C77A",
        cocoa: "#5A3A2A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        label: ["var(--font-label)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.3em",
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        "velvet-in-out": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "gold-drift": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(-120px) translateX(20px)", opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gold-drift": "gold-drift 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.83,0,0.17,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
