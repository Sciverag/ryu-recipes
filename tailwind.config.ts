import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cozy_text: ["'Quicksand'", "'cursive'"],
        cozy_title: ["'Pacifico'", "'cursive'"]
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        cozytheme: {
          "primary": "#A97155",
          "secondary": "#FAD6A5",
          "accent": "#C9F2C7",
          "neutral": "#f2efe5",
          "base-100": "#fffdf7",
          "info": "#C4DBF6",
          "success": "#A3E4D7",
          "warning": "#F9E79F",
          "error": "#F1948A",
        }
      }
    ],
    darkTheme: "cozytheme",
    base: true,
  }
} satisfies Config;
