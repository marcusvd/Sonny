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
                'background-color': 'rgb(237, 237, 237)',
                'expired': 'rgb(220 38 38 / var(--tw-bg-opacity, 1))',
                'pendding': 'rgb(249 115 22 / var(--tw-bg-opacity, 1))',
                'paid': 'rgb(21 128 61 / var(--tw-bg-opacity, 1))'
            },
            colors: {
                'color-main': '#2ba1a8',
                'remove-color': '#c92424',
                'expired': 'rgb(220 38 38 / var(--tw-bg-opacity, 1))',
                'pendding': 'rgb(249 115 22 / var(--tw-bg-opacity, 1))',
                'paid': 'rgb(21 128 61 / var(--tw-bg-opacity, 1))'
            },
            fontFamily: {
                default: ['Mynerve'],
            },
        },
    },
    plugins: [],
}
