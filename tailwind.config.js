/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            height: {
                120: '45.5rem',
            },
            keyframes: {
                heartBeat: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.5)' },
                },
                disappear: {
                    '100%': { transform: 'translateX(999px)' },
                },
            },
            animation: {
                heartBeat: 'heartBeat 1s infinite',
                disappear: 'disappear 0.5s normal',
            },
        },
    },
    plugins: [
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    'animation-delay': (value) => {
                        return {
                            'animation-delay': value,
                        };
                    },
                },
                {
                    values: theme('transitionDelay'),
                }
            );
        }),
    ],
};
