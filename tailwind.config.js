/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html', './static/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['"Urbanist"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
        sourcesans: ['"Source Sans Pro"', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'purple-100': '#90278e',
        'green-100': '#3ab549',
        'green-200': '#2a6041',
        ink: {
          950: '#05070d',
          900: '#0a0e1a',
          800: '#10162a',
          700: '#182038',
        },
        neon: {
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          mint: '#34d399',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
