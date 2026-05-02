/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#c9a84c',
        'gold-light': '#e8c97a',
        'gold-pale': '#f5e9c4',
        ink: '#060504',
        ivory: '#f6f1e8',
        blush: '#f8c8dc',
        lavender: '#e8d5f0',
        nude: '#f5e6d3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        cap: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
