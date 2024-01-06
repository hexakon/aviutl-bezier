/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      "fontFamily": {
        custom: ["Barlow", "sans-serif"]
      }
    }
  },
  plugins: [],
}

