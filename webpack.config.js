const path = require('path');

module.exports = {
  mode: 'production', // specify mode as 'production'
  entry: {
    main: './scrips/1.js',
    pillar: './scripts/Wild-Fire.js',
    support: './scripts/spark.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    crossOriginLoading: 'anonymous',
    filename: '[name]_PRObundle.js'
  }
};

module.exports = {
  mode: 'development', // specify mode as 'development'
  entry: {
    main: './scripts/1.js',
    fire: './Devs/Dev2.0.js',
    autoPilot: './scripts/hospitalBay.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    crossOriginLoading: 'anonymous',
    filename: '[name]bundle.js'
  },
  
  devServer: {
    static: path.join(__dirname, ''),
    port: 1000,
    hot: true
  },


  resolve: {
    alias: {
      'firebase/app$': './node_modules/firebase/app/dist/index.cjs.js',
    },
  },
};

