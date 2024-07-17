import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#7bf1a8",
        secondary: {
          100: "#FEFDF4",
          200: "#F4F3EB",
          300: "#ffaa01"
        }
      },
      rotate: {
        '3': '-3deg',
      },
    },
  },
  plugins: [],
};
export default config;
