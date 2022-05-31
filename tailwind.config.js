module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightRed: "#FF6700",
        brownBlack: "#2A2A2A",
        lightOrange: "#E5E5E51A",
        fairOrange: "#e5e5e5",
        lightBrown: 'rgba(255, 103, 0, 0.08)',
        orange: '#FF6700'
      },
      dropShadow: {
        '3xl': '0px, 7px rgba(255, 103, 0, 0.04)'
      },
      gridTemplateColumns: {
        'layout': '40% 60%'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
