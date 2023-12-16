import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        caption: "10px",
      },
      lineHeight: {
        caption: "0",
      },
      fontFamily: {
        "nova-square": ["var(--font-nova-square)"],
        merriweather: ["var(--font-merriweather)"],
        poppins: ["var(--font-poppins)"],
        merienda: ["var(--font-merienda)"],
        mclaren: ["var(--font-mclaren)"],
      },
      backgroundImage: {
        "hero-pattern": 'linear-gradient(to bottom, rgba(0,0,0, 0.5), rgba(0,0,0, 0.8)), url("../public/hero-wallpaper.webp")',
        "evertale-hero-pattern": 'linear-gradient(to bottom, rgba(0,0,0, 0.5), rgba(0,0,0, 0.8)), url("../public/evertale-home-page.webp")',
      },
    },
  },
  plugins: [],
};
export default config;
