/** @type {import('tailwindcss').Config} */
const animatePlugin = require("tailwindcss-animate");

module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af"
        },
        accent: "#f59e0b",
        danger: "#ef4444",
        success: "#10b981"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [animatePlugin],
};
