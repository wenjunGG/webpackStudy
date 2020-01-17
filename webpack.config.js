const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JS 执行入口文件
  entry: './main.jsx',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  mode: "development",
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        // loaders: ['style-loader', 'css-loader'],
        exclude:/\.module\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      }
    ]
  },
  devServer: {
    //静态文件得文字，绝对位子
    contentBase: path.join(__dirname, './dist'),
    port: 6061,
    inline: true,
    historyApiFallback: true, //不跳转
  },
  //配置自带插件--watch的刷新频率
  // watchOptions: {
  //   poll: 1000, //监测修改的时间(ms)
  //   aggregateTimeout: 500, //防止重复按键，500毫秒内算按一次
  //   ignored: /node_modules/, //不监测
  // },
  plugins: [
    new CleanWebpackPlugin(),

    //进度
    new webpack.ProgressPlugin(),

    //devserver 启动替换 热更新
    new webpack.HotModuleReplacementPlugin(),

    //插件配置模板
    new HtmlWebpackPlugin({
      title: 'html模板',
      template: "./index.html",
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }, ),
    //从 .js 文件中提取出来的 .css 文件的名称
    new ExtractTextPlugin({
      // 因为webpack4.x包含了contentash这个关键字段，所以在ExtractPlugin中不能使用contenthash
      // 使用md5:contenthash:hex:8替代
      filename: `[name]_[md5:contenthash:hex:8].css`,
    }),
  ],
  //这里是表示打包时使用source-map，打包之后调试会直接跳到source-map中，再也不用看压缩代码。
  devtool: '#eval-source-map',
};