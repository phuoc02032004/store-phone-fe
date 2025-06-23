// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        darkText: 'var(--foreground)',
        darkBg: 'var(--background)',
        darkLink: 'var(--primary)',
        darkLinkHover: 'var(--accent)',
        darkButtonBg: 'var(--primary)',
        darkButtonBorderHover: 'var(--border)',
        lightText: 'var(--foreground)',
        lightBg: 'var(--background)',
        lightLinkHover: 'var(--accent)',
        lightButtonBg: 'var(--primary)',
        buttonPrimaryBg: 'var(--color-button-primary-bg)',
        buttonPrimaryForeground: 'var(--color-button-primary-foreground)',
        buttonPrimaryHoverBg: 'var(--color-button-primary-hover-bg)',
        buttonDestructiveBg: 'var(--color-button-destructive-bg)',
        buttonDestructiveForeground: 'var(--color-button-destructive-foreground)',
        buttonDestructiveHoverBg: 'var(--color-button-destructive-hover-bg)',
        buttonOutlineBorder: 'var(--color-button-outline-border)',
        buttonOutlineBg: 'var(--color-button-outline-bg)',
        buttonOutlineHoverBg: 'var(--color-button-outline-hover-bg)',
        buttonOutlineHoverForeground: 'var(--color-button-outline-hover-foreground)',
        buttonSecondaryBg: 'var(--color-button-secondary-bg)',
        buttonSecondaryForeground: 'var(--color-button-secondary-foreground)',
        buttonSecondaryHoverBg: 'var(--color-button-secondary-hover-bg)',
        buttonGhostHoverBg: 'var(--color-button-ghost-hover-bg)',
        buttonGhostHoverForeground: 'var(--color-button-ghost-hover-foreground)',
        buttonLinkForeground: 'var(--color-button-link-foreground)',
        gold: 'var(--color-gold)',
        silver: 'var(--color-silver)',
        richBlack: 'var(--color-rich-black)',
        appleLightGray: 'var(--color-apple-light-gray)',
        appleDarkGray: 'var(--color-apple-dark-gray)',
        appleDarkGrayHover: 'var(--color-apple-dark-gray-hover)',
        appleButtonGray: 'var(--color-apple-button-gray)',
        appleBlack: 'var(--color-apple-black)',
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