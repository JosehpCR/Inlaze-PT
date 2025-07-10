const { nextui } = require('@nextui-org/react');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
