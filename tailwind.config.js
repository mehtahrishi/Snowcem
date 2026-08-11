/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        snowcem: {
          orange: "#f36c21",
          amber: "#fb8c00",
          yellow: "#ffb300",
          purple: "#4a154b",
          navy: "#0d1b3e",
          deepNavy: "#040d21",
          blue: "#1a73e8",
          magenta: "#8e003b",
          gradientRed: "#b8004f",
          canvas: "#f8fafc",
          slate: "#1e293b",
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
