var path = require('path');
// var webpack = require('webpack');
// var HandlebarsPlugin = require("handlebars-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'babel-polyfill',
    './src/index.html',
    './src/pt/index.html',
    './src/en/index.html',
    './src/es/index.html',
    './src/fr/index.html',
  ],
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-1']
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!autoprefixer!sass"
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          exclude: [
            path.join(__dirname, 'node_modules', 'assets')
          ]
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HtmlWebpackPlugin({ template: './src/pt/index.html' }),
    new HtmlWebpackPlugin({ template: './src/es/index.html' }),
    new HtmlWebpackPlugin({ template: './src/en/index.html' }),
    new HtmlWebpackPlugin({ template: './src/fr/index.html' }),
    new ExtractTextPlugin('styles.css'),
  ],
};
