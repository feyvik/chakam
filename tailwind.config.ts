/** @format */

// /** @format */

import tailwindcssAnimate from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 3s ease-out infinite",
        "pulse-slow": "pulse-slow 3s infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
