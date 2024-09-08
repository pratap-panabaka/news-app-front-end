/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        lite: "#AEC3B0",
        toolite: "#EFF6E0",
        dark: "#124559",
        toodark: "#01161E",
        active: "#FA824C"
      },
      fontFamily: {
        sans: ['"palanquin-dark"', "sans-serif"],
        custom: ['palanquin-dark', "sans-serif"]
      }
    },
  },
  plugins: [forms],
}