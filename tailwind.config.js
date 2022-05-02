module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        "with-nav": "140px 1fr;",
      },
      gridTemplateColumns: {
        "without-nav": "100px 1fr",
      },
    },
    fontFamily: {
      serif: "Space Grotesk, sans-serif",
    },
  },
  variants: {}
};
