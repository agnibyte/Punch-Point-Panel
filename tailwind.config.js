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
        textGlow: 'textGlow 3s ease-in-out infinite',
      },
      keyframes: {
        textGlow: {
          '0%': {
            textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.7)',
            color: '#ffffff',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 40px #ffeb3b',
            color: '#ffeb3b',
          },
          '100%': {
            textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.7)',
            color: '#ffffff',
          },
        },
      },
    },
  },
  plugins: [],
};
