/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
		width: {
			'108': '28rem'
		}
		},
	},
	plugins: [],
}