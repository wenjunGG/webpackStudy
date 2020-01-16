const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  mode:"development",
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        // loaders: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
            // 转换 .css 文件需要使用的 Loader
            use: ['css-loader'],
          }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    contentBase:'./dist',
    port: 8081,
    inline: true,
    hot: true
},
  plugins: [
    //new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //     title:'html模板',
    //     template:"./index.html"
    // }),
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
        // 因为webpack4.x包含了contentash这个关键字段，所以在ExtractPlugin中不能使用contenthash
        // 使用md5:contenthash:hex:8替代
        filename: `[name]_[md5:contenthash:hex:8].css`,
    }),
  ],
  //devtool:'inline-source-map',//打包后的文件映射
 // mode:"development"//去掉警告，开发模式
};
