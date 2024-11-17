/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-10%)', opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(10%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideOutLeft: 'slideOutLeft 0.3s ease-in-out forwards',
        slideInRight: 'slideInRight 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')
  ],
}
