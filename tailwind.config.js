/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#3498DB", active: "#0B7FCD" },
        "light-gray": "#ECF0F1",
      },
      boxShadow: {
        base: "0px 6px 16px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
