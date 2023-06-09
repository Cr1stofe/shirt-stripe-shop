/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
      colors: {
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          800: '#202024',
          900: '#121214',
        },
        green: {
          300: '#00B37E',
          500: '#00875F',
        },
        gradient: {
          'top': '#1ea483',
          'bottom': '#7465d4',
        },
      },
      fontSize: {
        md: '1.135rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
