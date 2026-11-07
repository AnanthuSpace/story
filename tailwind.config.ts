import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        burgundy: "var(--burgundy)",
        sage: "var(--sage)",
        "cream-light": "var(--cream-light)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        editorial: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
