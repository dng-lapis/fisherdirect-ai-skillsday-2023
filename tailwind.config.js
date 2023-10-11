/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      // {
      //   cyberpunk: {
      //     ...require("daisyui/src/theming/themes")["[data-theme=cyberpunk]"],
      // primary: "#e8b166",
      // secondary: "#c7fc9c",
      // accent: "#d36243",
      // neutral: "#241929",
      // "base-100": "#e6e7ea",
      // info: "#59c5e8",
      // success: "#18a075",
      // warning: "#efd348",
      // error: "#e8352c",
      // },
      // },
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          primary: "#063F5C",
          secondary: "#53758a",
          accent: "#f58015",
          // neutral: "#241929",
          // "base-100": "#e6e7ea",
          // info: "#59c5e8",
          // success: "#18a075",
          // warning: "#efd348",
          // error: "#e8352c",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
