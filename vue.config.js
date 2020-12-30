const webpack = require('webpack');
module.exports = {
  devServer: {
    port: 9630,
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: (config) => {
    // 配置图片路径别名  使用例子 $dark-bg-color: url("~img/indexbg.jpg") center no-repeat; 通过 ~ 来让webpack识别使用别名
    config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); // 忽略/moment/locale下的所有文件
  }
};