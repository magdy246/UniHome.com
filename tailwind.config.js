/** @type {import('tailwindcss').Config} */
module.exports = {
    tailwindcss: {},
    autoprefixer: {},
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
    require("tw-elements-react/dist/plugin.cjs"),
    require('daisyui'),
  ],
};
