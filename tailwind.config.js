/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'n8n-orange': '#ff6d5a',
        'n8n-dark': '#1a1a2e',
        'n8n-darker': '#0f0f1a',
        'n8n-gray': '#2d2d44',
        'n8n-light': '#4a4a6a',
      },
    },
  },
  plugins: [],
}
