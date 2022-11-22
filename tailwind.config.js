/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#343a40",
        "sidebar-border": "#4b545c",
      },
      transitionProperty: {
        height: "height",
        rotate: "rotate",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
