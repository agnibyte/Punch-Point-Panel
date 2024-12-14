/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        textGlow: "textGlow 3s ease-in-out infinite",
      },
      keyframes: {
        textGlow: {
          "0%": {
            textShadow:
              "0 0 8px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.7)",
            color: "#ffffff",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 40px #ffeb3b",
            color: "#ffeb3b",
          },
          "100%": {
            textShadow:
              "0 0 8px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.7)",
            color: "#ffffff",
          },
        },
      },

      animation: {
        dropdown: "dropdown 0.3s ease-out forwards",
      },
      keyframes: {
        dropdown: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        'spin-3d': 'spin-3d 4s linear infinite', // Adjust speed here
      },
      keyframes: {
        'spin-3d': {
          '0%': { transform: 'rotateY(0deg)' }, // Start at 0 degrees
          '100%': { transform: 'rotateY(360deg)' }, // End at 360 degrees
        },
      },
    },
  },
  plugins: [],
};
