'use strict';

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

let compiler;

module.exports = {
  register(/*{ strapi }*/) {
    compiler = webpack({
      mode: 'development',
      devtool: 'cheap-module-source-map',
      entry: path.resolve(__dirname, './client/index.js'),
      output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public'),
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      plugins: [new webpack.EnvironmentPlugin(['SHOPIFY_API_KEY'])],
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
      },
    });
  },

  async bootstrap({ strapi }) {
    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          strapi.log.error(err.message);
          reject();
        } else {
          const { errors, warnings } = stats.toJson('minimal');
          if (errors && errors.length > 0) {
            for (const error of errors) {
              strapi.log.error(error.message);
            }
          }
          if (warnings && warnings.length > 0) {
            for (const warning of warnings) {
              strapi.log.warn(warning.message);
            }
          }
          resolve();
        }
      });
    });
  },

  async destroy({ strapi }) {
    await new Promise((resolve) => {
      compiler.close((err) => {
        if (err) {
          strapi.log.error(err.message);
        }
        resolve();
      });
    });
  },
};
