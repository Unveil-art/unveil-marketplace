/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unveilBlack: "#141414",
        unveilGrey: "rgba(0, 0, 0, 0.6)",
        unveilWhite: "#F7F4ED",
        unveilCreme: "#f9f7f2",
        unveilYellow: "#FFB800",
        unveilDrakGray: "#B2b4ae",
        unveilGreen: "#b2b4ae",
        bgColor: "rgba(21, 17, 0, 0.05)",
        bgColorHover: "rgba(21, 17, 0, 0.1)",
        bgBlackOpacity: "rgba(0, 0, 0, 0.1)",
        bgBlackOpacity2: "rgba(0, 0, 0, 0.2)",
        unveilTransparent: "#EEECE6",
      },
      fontFamily: {
        teodor: ["Teodor", "sans-serif"],
        graphik: ["Graphik", "sans-serif"],
        tobias: ["Tobias", "sans-serif"],
        reckless: ["Reckless", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
