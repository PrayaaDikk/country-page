/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteTheme: "#D2D5DA",
				blackTheme: "#1B1D1F",
				blackTheme2: "#282B30",
				grayTheme: "#6C727F",
				blueSky: "#4E80EE",
      },
    },
  },
  plugins: [],
};
