/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004D3D',
        accent: '#06954B',
        gold: '#AB945E',
        cream: '#FEF9F3',
        coral: '#FF5A82',
        orange: '#F3AD6D',
      },
      fontFamily: {
        poppins: ['Poppins', 'Noto Sans Bengali', 'sans-serif'],
        kapakana: ['Kapakana', 'cursive'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
        alkalami: ['Alkalami', 'serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
