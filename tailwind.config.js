module.exports = {
    content: ['./app/**/*.{ts,tsx}'],
    theme: {
      extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms')
    ],
  };