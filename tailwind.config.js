/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#99896B",
        dark: "#171717",
        gray: {
          200: "#D9D9D9",
          500: "#424242",
          900: "#252525",
        },
      },
      boxShadow: {
        base: "0px 6px 16px 0px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        "xs":"36rem"
      }
    },
  },
  plugins: [],
};
