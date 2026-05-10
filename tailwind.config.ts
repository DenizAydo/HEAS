import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#f4f1ea", elev: "#fbfaf6" },
        ink: { DEFAULT: "#1a2332", soft: "#3a4655" },
        line: { DEFAULT: "#e2dfd5", strong: "#d2cdbf" },
        gold: { DEFAULT: "#d4a853", soft: "#f3e8c8", ink: "#6b4f1a" },
        plum: { DEFAULT: "#6b5b95", soft: "#ece6f3", ink: "#3d2f5e" },
        dark: { DEFAULT: "#1a2332", soft: "#2b3648" },
        green: { DEFAULT: "#4f7a4a", soft: "#e3ecdc" },
        red: { DEFAULT: "#a8503e", soft: "#f1ddd6" },
        amber: { DEFAULT: "#b8862e", soft: "#f5e9c5" },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Fraunces'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "elev-sm": "0 1px 2px rgba(26,35,50,0.04), 0 1px 3px rgba(26,35,50,0.06)",
        "elev-md": "0 2px 6px rgba(26,35,50,0.05), 0 8px 24px rgba(26,35,50,0.08)",
        "elev-lg": "0 12px 32px rgba(26,35,50,0.12), 0 4px 12px rgba(26,35,50,0.06)",
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
