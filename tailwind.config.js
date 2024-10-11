/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003EFF",
        accent: "#697598",
        darkGray: "#373B47",
      }
    },
  },
  plugins: [],
};
