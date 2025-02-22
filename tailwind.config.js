/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e0c068',
          DEFAULT: '#1E40AF',
          dark: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
}