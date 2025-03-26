module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        primary: {
          blue: '#1526ff',
          purple: '#9c00bc',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #1526ff, #9c00bc)',
      },
    },
  },
  plugins: [],
}