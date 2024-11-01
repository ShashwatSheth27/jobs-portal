/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#292929',
        'silver-gray': '#83909F',
        'slate-gray': '#A8A8A8',
      },
    },
  },
  plugins: [],
};

