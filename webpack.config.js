const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
   const mode = argv.mode;
   console.log('mode', mode);
   const isDevelopment = mode === 'development';

   return {
      mode,
      entry: './src/index.js',
      output: {
         filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
         path: path.resolve(__dirname, 'dist'),
      },
      devtool: isDevelopment ? 'inline-source-map' : false,
      devServer: {
         static: {
            directory: path.join(__dirname, 'dist'),
         },
         compress: true,
         port: 3000,
      },
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                  },
               },
            },
            {
               test: /\.(sa|sc|c)ss$/,
               use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
               test: /\.html$/,
               use: ['html-loader'],
            },
            {
               test: /\.(png|svg|jpg|jpeg|gif)$/i,
               type: 'asset/resource',
               generator: {
                  filename: 'images/[name][ext][query]',
                },
            },
         ],
      },
      optimization: {
         minimize: true,
         minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
         splitChunks: {
            chunks: 'all',
         },
      },
      plugins: [
         new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
         }),
         new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
         }),
      ],
   };
};
