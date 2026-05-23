import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1024px",
        fhd: "1920px",
      },
      colors: {
        bg: {
          DEFAULT: "rgb(var(--c-bg) / <alpha-value>)",
          elev: "rgb(var(--c-bg-elev) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--c-line) / <alpha-value>)",
          strong: "rgb(var(--c-line-strong) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "#d4a853",
          soft: "rgb(var(--c-gold-soft) / <alpha-value>)",
          ink: "rgb(var(--c-gold-ink) / <alpha-value>)",
        },
        plum: {
          DEFAULT: "#6b5b95",
          soft: "rgb(var(--c-plum-soft) / <alpha-value>)",
          ink: "rgb(var(--c-plum-ink) / <alpha-value>)",
        },
        dark: { DEFAULT: "#1a2332", soft: "#2b3648" },
        green: {
          DEFAULT: "#4f7a4a",
          soft: "rgb(var(--c-green-soft) / <alpha-value>)",
        },
        red: {
          DEFAULT: "#a8503e",
          soft: "rgb(var(--c-red-soft) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "#b8862e",
          soft: "rgb(var(--c-amber-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Fraunces'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "elev-sm": "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        "elev-md": "0 2px 6px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)",
        "elev-lg": "0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        pop: {
          from: { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        slideUp: "slideUp 320ms cubic-bezier(.2,.9,.3,1) both",
        fadeIn: "fadeIn 160ms ease",
        pop: "pop 200ms cubic-bezier(.2,.9,.3,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
