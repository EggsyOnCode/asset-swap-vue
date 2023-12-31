/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#460DA2",
      secondary: "#9D88B2",
      accent: "#E8D5B5",
      bg: "#FBD9FF",
      green: "#FAFF00",
      black: "#000000",
      white: "#FFFFFF",
    },
    fontFamily: {
      garamond: ["EB Garamond", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
