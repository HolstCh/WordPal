/** @type {import('tailwindcss').Config} **/

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            maxHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',
                '114': '26rem',
                '115': '27rem',
                '116': '28rem',
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
}