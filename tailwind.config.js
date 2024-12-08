/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '0rem',
      screens: {
        // sm: '480px',
        // md: '768px',
        // lg: '1024px',
        // xl: '1280px',
        '2xl': '1400px'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif', 'system-ui']
    },
    extend: {
      colors: {
        global_bg: '#F3F4F6',
        primary: '#0ea5e9',
        sky2: '#bae6fd',
        sky3: '#7dd3fc',
        sky7: '#0369a1',
        btnBg: '#0369a1'
      },
      utilities: {
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden'
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')]
}
