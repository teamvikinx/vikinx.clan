import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            animation: {
                shimmer: 'shimmer 2s linear infinite',
            },
            keyframes: {
                shimmer: {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        nextui({
            prefix: 'vikinx', // prefix for themes variables
            addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: 'dark', // default theme from the themes object
            defaultExtendTheme: 'dark', // default theme to extend on custom themes
            layout: {
                spacingUnit: 4, // in px
                disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
                dividerWeight: '1px', // h-divider the default height applied to the divider component
                fontSize: {
                    tiny: '0.75rem', // text-tiny
                    small: '0.875rem', // text-small
                    medium: '1rem', // text-medium
                    large: '1.125rem', // text-large
                },
                lineHeight: {
                    tiny: '1rem', // text-tiny
                    small: '1.25rem', // text-small
                    medium: '1.5rem', // text-medium
                    large: '1.75rem', // text-large
                },
                radius: {
                    small: '8px', // rounded-small
                    medium: '12px', // rounded-medium
                    large: '14px', // rounded-large
                },
                borderWidth: {
                    small: '1px', // border-small
                    medium: '2px', // border-medium (default)
                    large: '3px', // border-large
                },
            },
            themes: {
                dark: {
                    colors: {
                        primary: {
                            DEFAULT: '#FF3131',
                            '100': '#FFE4D5',
                            '200': '#FFC2AC',
                            '300': '#FF9883',
                            '400': '#FF7164',
                            '500': '#FF3131',
                            '600': '#DB2333',
                            '700': '#B71834',
                            '800': '#930F31',
                            '900': '#7A0930',
                            foreground: '#fff',
                        },
                        success: {
                            DEFAULT: '#5FE855',
                            '100': '#EAFDDD',
                            '200': '#D0FCBC',
                            '300': '#AFF899',
                            '400': '#8FF17E',
                            '500': '#5FE855',
                            '600': '#3EC740',
                            '700': '#2AA736',
                            '800': '#1B862E',
                            '900': '#106F29',
                        },
                        secondary: {
                            DEFAULT: '#02AEE8',
                            '100': '#CBFDFC',
                            '200': '#98F8FC',
                            '300': '#64E7F8',
                            '400': '#3DD0F1',
                            '500': '#02AEE8',
                            '600': '#0187C7',
                            '700': '#0165A7',
                            '800': '#004886',
                            '900': '#00346F',
                        },
                        warning: {
                            DEFAULT: '#F7D513',
                            '100': '#FEFACF',
                            '200': '#FEF4A0',
                            '300': '#FCEC70',
                            '400': '#FAE34C',
                            '500': '#F7D513',
                            '600': '#D4B30D',
                            '700': '#B19309',
                            '800': '#8F7406',
                            '900': '#765E03',
                        },
                        danger: {
                            DEFAULT: '#d14300',
                            '100': '#FCE7CA',
                            '200': '#FAC996',
                            '300': '#F1A160',
                            '400': '#E37A38',
                            '500': '#d14300',
                            '600': '#B32D00',
                            '700': '#961C00',
                            '800': '#790F00',
                            '900': '#640500',
                        },
                    },
                    layout: {
                        hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
                        boxShadow: {
                            // shadow-small
                            small: '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                            // shadow-medium
                            medium: '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                            // shadow-large
                            large: '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
                        },
                    },
                },
            },
        }),
    ],
} satisfies Config;

export default config;
