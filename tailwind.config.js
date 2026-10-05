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
          canvas: "#EDE4D8",
          slate: "#1e293b",
          richBlack: "#0B0B0E",
          brandBlue: "#5B6BB5",
          brandPink: "#DF3F6F",
        },
        richBlack: "#0B0B0E",
        canvas: "#EDE4D8",
        brandBlue: "#5B6BB5",
        brandPink: "#DF3F6F",
      },
      fontFamily: {
        heading: ['"Cabinet Grotesk"', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '-apple-system', 'sans-serif'],
        cabinet: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        label: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"Cabinet Grotesk"', 'monospace'],
      }
    },
  },
  plugins: [],
};
