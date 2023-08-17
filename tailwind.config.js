/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121212",
        upload: "#7164C0",
        primaryColor: "#E29507",
        white: "#fff",
        lighterGray: "#E9E9E9",
        lightGray: "#BFBFBF",
        gray: "#838383",
        darkGray: "#1A1A1A",
        fbBlue: "#096DD9",
        fbBlueDark: "#366AB6",
        disabledPrimary: "rgba(226, 149, 7, 0.38)",
        activePrimary: "rgba(226, 149, 7, 0.5)",
        activePrimaryCard: "rgba(226, 149, 7, 0.1)",
        activePrimaryCardDark: "rgba(226, 149, 7, 0.2)",
        error: "#EB5555",
        success: "#4CBE6B",
        successLight: "rgba(2, 194, 33, 0.1)",
      },
    },
  },
  plugins: [],
};
