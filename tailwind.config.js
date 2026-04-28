/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html','./static/**/*.js',],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['"Urbanist"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
        sourcesans: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        'purple-100': '#90278e',
        'green-100': '#3ab549',
        'green-200': '#2a6041',

       
      },
    },
  },
  plugins: [],
}

