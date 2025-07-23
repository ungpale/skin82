/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.php",
    "./js/**/*.js",
    "./_wg/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'cafe24-primary': '#1a73e8',
        'cafe24-secondary': '#34a853',
      },
      fontFamily: {
        'noto': ['Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

