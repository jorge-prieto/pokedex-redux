module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
       '2col': '1fr 20px',
       'cards': 'repeat(auto-fit, minmax(150px, 1fr))',
       'md-2col': '1fr 100px',
       'md-cards': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
      minWidth: {
        '1/2':'420px',
      },
      maxWidth: {
        '1/2':'450px',
      },
      zIndex: {
        '-1': '-1',
        '1': '1',
       },
      height: {
        xxl: '40rem',
      },
      colors: {
        'black': '#000',
        'orange': '#ffa500',
        'just-white': '#fff',
        'off-white': '#faf8f7',
        'yellow': '#ffff00',
        'red': '#ff0000',
        'gray': '#909090',
        'off-grey': '#ddd',
        'background': 'rgba(255, 127, 80, 0.8)',
        'shadow': 'rgba(0, 0, 0, 0.2)',
        'card': 'rgba(127, 255, 212,0.8)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
