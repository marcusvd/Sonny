/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                'main-color': '#2ba1a8',
                'backgroud-color': 'rgb(237, 237, 237)'
            },
            colors: {
                'color-title-comp': '#555555',
                'color-main': '#2ba1a8'

            },
            fontFamily: {
                mynerve: ['Mynerve'], // Adicione sua fonte aqui
            },

        },
    },
    plugins: [],
}
