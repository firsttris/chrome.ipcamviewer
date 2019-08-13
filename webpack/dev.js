const base = require('./base'),
  writeFilePlugin = require('write-file-webpack-plugin'),
  path = require('path');

base.mode = 'development';

base.plugins.push(new writeFilePlugin());

base.devServer = {
  hot: true,
  contentBase: path.join(__dirname, '../build'),
  disableHostCheck: true,
  port: 3000,
  historyApiFallback: true
};

module.exports = base;
