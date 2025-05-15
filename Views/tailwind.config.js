/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                'main-color': '#2ba1a8',
                'remove-color': '#c92424',
                'backgroud-color': 'rgb(237, 237, 237)'
            },
            colors: {
                'color-main': '#2ba1a8',
                'remove-color': '#c92424',
            },
            fontFamily: {
                default: ['Mynerve'],
            },
        },
    },
    plugins: [],
}