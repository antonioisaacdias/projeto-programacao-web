import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0b1f",
        foreground: "#e8e6f0",
        primary: "#8b5cf6",
        secondary: "#a78bfa",
        accent: "#c084fc",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#1e1735",
        border: "#2d2550",
      },
    },
  },
  plugins: [],
};

export default config;