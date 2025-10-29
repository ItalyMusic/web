/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'imperial-burgundy': '#732638',
        'imperial-dark': '#1e0a0f',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
