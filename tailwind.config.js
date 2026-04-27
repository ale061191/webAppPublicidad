/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#131313',
        primary: '#75ff9e',
        'primary-container': '#00e676',
        'on-primary': '#003918',
        surface: '#131313',
        'surface-container': '#201f1f',
        'surface-container-low': '#1c1b1b',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-container-lowest': '#0e0e0e',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#bacbb9',
        outline: '#859585',
        'outline-variant': '#3b4a3d',
        error: '#ffb4ab',
        'error-container': '#93000a',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};