/** @type {import('tailwindcss').Config} */
const animatePlugin = require("tailwindcss-animate");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',     // iPhone SE, Galaxy S8
      'sm': '375px',     // iPhone X/11/12/13 Mini
      'md': '390px',     // iPhone 12/13/14
      'lg': '414px',     // iPhone 8/7/6 Plus
      'xl': '428px',     // iPhone Pro Max
      '2xl': '512px',    // Tablets pequenos
      '3xl': '768px',    // Tablets
      '4xl': '1024px',   // Desktop
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
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
