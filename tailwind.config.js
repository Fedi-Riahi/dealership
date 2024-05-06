/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'back': '#f8f8f8',
        'porsche': '#eeeff2',
        'zinc': '#18181B',
      },
    },
    fontFamily:{
      'mercedes-bold':'Corporate A',
      'mercedes-light':'Corporate A BQ'
    }
  },
  plugins: [],
};
