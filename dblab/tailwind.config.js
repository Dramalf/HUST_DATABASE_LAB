module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '1/3':'33.333333%',
        '2/3': '66.666667%',
        '1/6': '16.666667%',
        '1/4': '25.000000%',
        '3/4': '75.000000%',
        '1/5': '20.000000%',
        '2/5': '40.000000%',
        '3/5': '60.000000%',
        '4/5':'80.000000%',
        '5/6': '86.777778%',
        '1/8': '12.500000%',
        '1/10':"10%",
      },
      animation: {
        'spin-once': 'spin 1s linear .5s 1',
      },
    },
  },
  variants: {
    extend: {
      animation:['hover','focus']
    },
  },
  plugins: [],
}
