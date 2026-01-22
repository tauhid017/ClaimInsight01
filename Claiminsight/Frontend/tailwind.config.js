/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B3C53",
        secondary: "#234C6A",
        accent: "#456882",
        light: "#E3E3E3"
      }
    }
  },
  plugins: []
};
