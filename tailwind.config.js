import flowbite from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/lib/**/*.js',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {},
  plugins: [flowbite],
};
