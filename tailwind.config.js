/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 2px 4px #0003, 0 25px 50px #0000001a'
      }
    },
  },
  plugins: [],
}

