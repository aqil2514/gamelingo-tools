/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

module.exports = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        caption: "10px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "evertale-hero-pattern": 'linear-gradient(to bottom, rgba(0,0,0, 0.5), rgba(0,0,0, 0.8)), url("../../public/evertale-home-page.webp")',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".main-wrapper": {
          "background-color": "rgb(24 24 27)",
          "min-height": "100vh",
          width: "100%",
        },
        ".scrollbar-style::-webkit-scrollbar": {
          height: "5px",
          width: "5px",
        },

        ".scrollbar-style::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          "border-radius": "10px",
        },

        ".scrollbar-style::-webkit-scrollbar-thumb": {
          "border-radius": "10px",
          "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.5)",
        },
      });
    }),
  ],
};
