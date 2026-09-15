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
        brand2: "#FF2B63",
        // Darker brand red for small text on light backgrounds (meets 4.5:1 contrast).
        brandInk: "#C70A3A",
        navy: "#0D1B3D"
      },
      boxShadow: {
        glow: "0 0 60px rgba(242,13,69,.18)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(24px, -18px, 0) scale(1.06)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        typing: {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: ".45" },
          "30%": { transform: "translateY(-3px)", opacity: "1" }
        },
        nudge: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" }
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "60%, 100%": { transform: "translateX(260%) skewX(-18deg)" }
        },
        flow: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        "flow-x": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        dash: {
          to: { strokeDashoffset: "-32" }
        }
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        typing: "typing 1.2s ease-in-out infinite",
        nudge: "nudge 1.8s ease-in-out infinite",
        shine: "shine 3.2s ease-in-out infinite",
        flow: "flow 2.4s linear infinite",
        "flow-x": "flow-x 2.4s linear infinite",
        dash: "dash 1.4s linear infinite"
      }
    }
  },
  plugins: []
};