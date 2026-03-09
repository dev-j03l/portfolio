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
          bg: "#0a0a0c",
          surface: "#0f0f12",
          panel: "#121215",
          border: "#252528",
          "border-focus": "#353538",
          accent: "#3d7fc6",
          cyan: "#4a9b9b",
          text: "#e2e2e5",
          muted: "#6b6b73",
          dim: "#4a4a52",
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
