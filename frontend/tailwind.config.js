/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FF8C',
        'background-start': '#0B3D2E',
        'background-end': '#00FF8C',
        glass: 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        cairo: ['"Cairo"', 'sans-serif'],
        tajawal: ['"Tajawal"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 255, 140, 0.4)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
