const path                     = require("path"),
  webpack                      = require("webpack"),
  HTMLWebpackPlugin            = require("html-webpack-plugin"),
  DashboardPlugin              = require('webpack-dashboard/plugin'),
  OpenBrowserPlugin            = require('open-browser-webpack-plugin'),
  CaseSensitivePathsPlugin     = require('case-sensitive-paths-webpack-plugin'),
  OptimizeCSSAssetsPlugin      = require('optimize-css-assets-webpack-plugin'),
  MiniCssExtractPlugin         = require("mini-css-extract-plugin");

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
  optimization: {
    minimizer:[
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
    ]
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
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: require.resolve("css-loader") }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new DashboardPlugin(),
    new OpenBrowserPlugin({ 
      url: `http://localhost:${process.env.PORT || 3000}` 
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename:'index.html',
      minify:true,
      title:"Link's Journal"
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    })
  ]
}
