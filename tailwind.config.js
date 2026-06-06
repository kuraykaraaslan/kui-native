const { colors } = require("./libs/utils/tailwind-tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
