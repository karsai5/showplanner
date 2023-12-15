/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0284c7",
          secondary: "#fcd34d",
          accent: "#38bdf8",
          neutral: "#d1d5db",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#16a34a",
          warning: "#b45309",
          error: "#b91c1c",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
