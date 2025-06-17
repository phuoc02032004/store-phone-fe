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
        primary: '#007bff', // Ví dụ màu chính
        secondary: '#6c757d', // Ví dụ màu phụ
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}