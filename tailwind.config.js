/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'gray': '#78737a',
        'spring-green': '#31e981',
        'dark-cyan': { 
          100:'#379392',
          200:'#338A89'

        },
      },
    },
  },
  plugins: [],
};
