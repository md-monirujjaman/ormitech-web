/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/data/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 560px)" },
        tall: { raw: "(min-height: 860px)" }
      },
      colors: {
        ink: "#07090D",
        panel: "#0D1118",
        line: "#202733",
        brand: "#F20D45",
        brand2: "#FF2B63"
      },
      boxShadow: {
        glow: "0 0 60px rgba(242,13,69,.18)"
      }
    }
  },
  plugins: []
};