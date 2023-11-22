const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');



module.exports = {
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    options: path.join(__dirname, "src", "js", "options.js"),
    background: path.join(__dirname, "src", "js", "background.js")
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: "[name].bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|eot|svg|ttf|woff|woff2|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'IPCamViewer',
      filename: 'popup.html',
      template: path.join(__dirname, "src", "templates", "popup.html"),
    }),
    new HtmlWebpackPlugin({
      title: 'IPCamViewer',
      filename: 'options.html',
      template: path.join(__dirname, "src", "templates", "options.html"),
    }),
    new HtmlWebpackPlugin({
      title: 'IPCamViewer',
      filename: 'background.html',
      template: path.join(__dirname, "src", "templates", "background.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './manifest.json',
          to: 'manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());
            manifest.version = process.env.npm_package_version;
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
  },
};