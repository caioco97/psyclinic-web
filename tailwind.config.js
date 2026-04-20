/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                psy: {
                    primary: "#1F6F73",
                    light: "#7CC9B5",
                    dark: "#0E3F43",
                    soft: "#5F8F92",
                    bg: "#F5F7F6",
                    text: "#1F2933",
                },
            },
        },
    },
    plugins: [],
};