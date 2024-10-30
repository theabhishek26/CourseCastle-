/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      'colors':{
        'porange':'#FA5418',
        'pred':'#FF3F3A',
        'pyellow':'#FFCF2D',
        'pgrey':'#F1F1F1'
      },
      fontFamily:{
        'cursive':["Caveat","sans-serif"],
        'afacad': ["Afacad Flux", 'sans-serif']
      }
    },
  },
  plugins: [],
}

