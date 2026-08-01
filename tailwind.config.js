/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff0f6',
          100: '#ffe0ef',
          200: '#ffc2df',
          300: '#ff94c8',
          500: '#e91e8c',
          600: '#d4176d',
          700: '#b01259',
          900: '#5c0030',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
        script: ['"Baloo 2"', 'cursive'],
      },
      borderRadius: {
        scrap: '24px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(233,30,140,0.35)',
        card: '0 6px 20px rgba(233,30,140,0.25)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 14px rgba(233,30,140,0.7))' },
          '50%': { filter: 'drop-shadow(0 0 32px rgba(233,30,140,1))' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        sparkle: 'sparkle 2.2s ease-in-out infinite',
        pulseHeart: 'pulseHeart 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
