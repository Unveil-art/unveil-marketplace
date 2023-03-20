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
        unveilWhite: "#f0ede4",
        unveilCreme: "#f9f7f2",
        unveilYellow: "#FFB800",
        unveilGreen: "#b2b4ae",
        bgColor: "rgba(21, 17, 0, 0.05)",
        bgColorHover: "rgba(21, 17, 0, 0.1)",
      },
      fontFamily: {
        teodor: ["Teodor", "sans-serif"],
        graphik: ["Graphik", "sans-serif"],
        tobias: ["Tobias", "sans-serif"],
        reckless: ["Reckless", "serif"],
      },
    },
  },
  plugins: [],
};
