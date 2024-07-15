import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        primary: {
          200: "#FED4D8",
          300: "#F99EA6",
          400: "#F26B76",
          500: "#E73B49",
          600: "#C42E3A",
          700: "#9F222C",
          800: "#7A1820",
        },
        auxiliary: {
          error: {
            400: "#EF5554",
            500: "#EA3D3C",
            600: "#CF3232",
          },
          warning: {
            400: "#FFD66B",
            500: "#FECE52",
            600: "#D8B043",
          },
          success: {
            400: "#50E170",
            500: "#32D958",
            600: "#28BB4A",
          },
        },
        neutral: {
          300: "#FBF8FC",
          400: "#F3F0F5",
          500: "#EDEAEF",
          600: "#343436",
          700: "#232224",
          800: "#161616",
        },
      },
      backgroundImage: {
        "gradient-primary": `linear-gradient(-160deg,#281214, #000000 30%)`,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
