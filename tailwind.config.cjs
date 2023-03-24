/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            slate: colors.slate,
            gray: colors.gray,
            zinc: colors.zinc,
            red: colors.red
        },
        extend: {}
    },
    plugins: []
};
