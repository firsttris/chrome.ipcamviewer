const base = require('./base'),
  webpack = require('webpack');

base.mode = 'production';

base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
);

module.exports = base;
