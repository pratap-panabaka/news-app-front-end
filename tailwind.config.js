/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '480px',
      desktop: '768px', ...defaultTheme.screens
    },
    extend: {
      colors: {
        lite: "#E8E9EB",
        dark: "#20A4F3",
        toodark: "#313638",
        pad: "#EF8354"
      },
      fontFamily: {
        custom: ['"mukta"', "sans-serif"],
        vortice: ['"vortice-concept"', "sans-serif"],
      },
      boxShadow: {
        'custom': '4px 4px 4px 4px rgba(22, 72, 99, 1)',
      },
      animation: {
        rotateAnimation: 'rotateAnimation 20s linear infinite'
      },

      keyframes: {
        rotateAnimation: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        }
      }
    },
    plugins: [],
  },
};
