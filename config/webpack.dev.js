const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const DashboardPlugin = require('webpack-dashboard/plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
module.exports = {
  mode:"development",
  entry: {
    main: ["./src/main.js"]
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
      compress: true,
      port: process.env.PORT || 3000,
      hot:true,
      overlay: {
          warnings: true,
          errors: true
      }
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader")
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve("style-loader")
          },
          { loader: require.resolve("css-loader") }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          { loader: require.resolve("style-loader")},
          { loader: require.resolve("css-loader"),options:{importLoaders:1} },
          { loader: require.resolve("postcss-loader")},
          { loader: require.resolve("sass-loader")  },
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: require.resolve("file-loader"),
            options: {
              name: "images/[name]-[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve("html-loader"),
            options: {
              minimize: true,
              removeComments: true,
              collapseWhitespace: true,
              attrs: ["img:src"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename:'index.html',
      minify:true,
      title:"Link's Journal"
    }),
    new DashboardPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${process.env.PORT || 3000}` }),
    new CaseSensitivePathsPlugin()
  ]
}
