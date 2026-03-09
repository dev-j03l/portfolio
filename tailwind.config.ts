import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      colors: {
        desktop: {
          bg: "var(--desktop-bg)",
          surface: "var(--surface)",
          panel: "var(--panel)",
          border: "var(--border)",
          "border-focus": "var(--border-focus)",
          accent: "var(--accent)",
          cyan: "var(--cyan)",
          text: "var(--text)",
          muted: "var(--muted)",
          dim: "var(--dim)",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
      },
      boxShadow: {
        window: "none",
      },
    },
  },
  plugins: [],
};

export default config;
