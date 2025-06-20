// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        darkText: 'var(--darkText)',
        darkBg: 'var(--darkBg)',
        darkLink: 'var(--darkLink)',
        darkLinkHover: 'var(--darkLinkHover)',
        darkButtonBg: 'var(--darkButtonBg)',
        darkButtonBorderHover: 'var(--darkButtonBorderHover)',
        lightText: 'var(--lightText)',
        lightBg: 'var(--lightBg)',
        lightLinkHover: 'var(--lightLinkHover)',
        lightButtonBg: 'var(--lightButtonBg)',
        appleGray: 'var(--appleGray)',
        appleBlue: 'var(--appleBlue)',
        appleBlueHover: 'var(--appleBlueHover)',
        appleNavbarText: 'var(--appleNavbarText)',
        appleDarkGray: 'var(--appleDarkGray)',
        appleDarkGrayHover: 'var(--appleDarkGrayHover)',
        appleLightGray: 'var(--appleLightGray)',
        appleCustomBlack: 'var(--black)',
        appleOffWhite: 'var(--appleOffWhite)',
        scrollbarTrack: 'var(--scrollbarTrack)',
        scrollbarThumb: 'var(--scrollbarThumb)',
        scrollbarThumbHover: 'var(--scrollbarThumbHover)',
        appleTextGray: 'var(--appleTextGray)',
        appleDarkBg: 'var(--appleDarkBg)',
        appleLightBg: 'var(--appleLightBg)',
        appleButtonGray: 'var(--appleButtonGray)',
        midnight: 'var(--color-midnight)',
        tahiti: 'var(--color-tahiti)',
        bermuda: 'var(--color-bermuda)',
      },
      backgroundImage: {
        'product-display-gradient': 'linear-gradient(to bottom, var(--product-display-gradient-start) 0%, var(--product-display-gradient-stop1) 18%, var(--product-display-gradient-stop2) 33%, var(--product-display-gradient-stop3) 49%, var(--product-display-gradient-stop4) 73%, var(--product-display-gradient-end) 100%)',
        'glass-gradient': 'linear-gradient(to top right, rgba(255,255,255,0.1), rgba(255,255,255,0))',
      },
      boxShadow: {
        'glass-shadow': '0 8px 32px 0 rgba(0,0,0,0.37)',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}