/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "13rem 1fr"
      },
      gridTemplateRows: {
        basicContent: "4rem 1fr 4rem"
      },
      height: {
        vh100: "100vh"
      },
      colors: {
        primary1: "#091e3b",
        primary2: "#07162c",
        white1: "#ffffff",
        gray1: "#d0d0d0",
        gray2: "#333333"
      }
    }
  },
  plugins: []
};
