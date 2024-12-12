/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'], /**Todo lo que se encuentre con .pug se generará una vista. ** no importa el nivel(carpeta) en el que esté, sólo se buscará cualquier archivo que tenga la extensión .pug**/
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-out-right': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(100%)'
          }
        }
      },
      animation: {
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'fade-out-right': 'fade-out-right 0.5s ease-out'
      }
    },
    colors:{
      'white': '#ffffff',
      'black': '#000000',
      'gray': '#78737a',
      'spring-green': '#31e981',
      'dark-cyan': { 
        100:'#379392',
        200:'#338A89'

      },
      'shadow': 'shadow'
    },
  },
  plugins: [],
  variants: {
    extend: {
        opacity: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
        transform: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
        scale: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus']
    }
}
}

