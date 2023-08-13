/** @type {import('tailwindcss').Config} */
// import colors from 'tailwindcss/colors';

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
    container: {
      // center: true
      // padding: '2rem'
    },
    // colors: {
    // 	transparent: 'transparent',
    // 	current: 'currentColor',
    // 	black: colors.black,
    // 	white: colors.white,
    // 	gray: colors.gray,
    // 	emerald: colors.emerald,
    // 	indigo: colors.indigo,
    // 	yellow: colors.yellow
    // }
    // fontSize: {
    // 	// '2xs': '1px'
    // 	// base: '1rem',
    // 	// xl: '1.25rem',
    // 	// '2xl': '1.563rem',
    // 	// '3xl': '1.953rem',
    // 	// '4xl': '2.441rem',
    // 	// '5xl': '3.052rem',
    // }
  },
  plugins: [require("@tailwindcss/typography")],
};
