const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./client/src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./client/build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "/client/public/index.html"
    })
  ],
  devServer: {
    proxy: {
      '/': 'http://localhost:3000'
      },
  
    static: {
      directory: path.join(__dirname, './client/build'),
    },
      port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}