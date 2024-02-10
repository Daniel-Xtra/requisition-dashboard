/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ash: {
          40: "#A5ADBA",
          50: "#A6ACBE",
          75: "#344563",
          100: "#F4F5F7",
          200: "#6B778C",
          300: "#97A0AF",
          400: "#253858",
          500: "#42526E",
          600: "#172B4D",
        },
        gray: { 50: "#DFE0EB", 100: "#90A0B7" },
        blue: {
          75: "#B3D4FF",
          100: "#4C9AFF",
          300: "#0065FF",
          400: "#0052CC",
          500: "#0747A6",
        },
        green: {
          75: "#ABF5D1",
          400: "#00875A",
          500: "#006644",
        },
        red: {
          50: "#FFEBE6",
          75: " #FFBDAD",
          400: "#DE350B",
          500: "#BF2600",
        },
        yellow: {
          100: "#FFE380",
        },

        grayscale: {
          100: "#252733",
        },
      },
      fontSize: {
        md: "2rem",
      },
    },
  },
  plugins: [],
};
