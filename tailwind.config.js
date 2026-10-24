/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      serif: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      mono: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      display: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      editorial: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      merienda: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
      heading: ['"Marina Bold"', 'Marina', 'Merienda', 'cursive', 'sans-serif'],
    },
    extend: {
      colors: {
        cyber: {
          bg: "#050810",
          card: "#0D1425",
          border: "rgba(32, 213, 242, 0.18)",
          cyan: "#20D5F2",
          blue: "#4388FF",
          purple: "#A855F7",
          glow: "rgba(32, 213, 242, 0.15)",
          text: "#F5F7FF",
          muted: "#91A0BA"
        },
        brand: {
          bg: "#050810",
          card: "#0D1425",
          border: "rgba(32, 213, 242, 0.18)",
          cyan: "#20D5F2",
          blue: "#4388FF",
          violet: "#A855F7",
          text: "#F5F7FF",
          muted: "#91A0BA"
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
