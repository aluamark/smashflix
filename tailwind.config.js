/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xs: "380px",
			sm: "440px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			fontFamily: {
				mont: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
