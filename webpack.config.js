//用来解析路径相关的模块
const path = require('path')
//__dirname: 代表当前文件夹所在目录的绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = { //配置对象  属性名
  //模式: 生产环境
  // mode: 'production',
  // 入口
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js', //可以带路径
    path: path.resolve(__dirname, 'dist')
  },
  // 模块加载器
  module: {
    rules: [
      // es6 ==> es5
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components)/, //不包含
        include: path.resolve(__dirname, 'src'),  //只包含哪些文件处理
        use: {
          loader: 'babel-loader',
          options: {
            //预设包: 包含多个常用插件包的一个大包
            presets: [ 
              ['@babel/preset-env', {
              useBuiltIns: 'usage',
              'corejs': 2 // 处理一些新语法的实现
              }]
            ], 
            //插件包
            plugins: [
              ['babel-plugin-component', {
                "libraryName": "mint-ui", // 针对mint-ui库实现按需引入打包
                "style": true // 自动打包对应的css
              }]
            ]
            // Error: .plugins[0][1] must be an object, false, or undefined
          }
        }
      },
      // 处理css 样式  vue单文件组件的style
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      // 处理 图片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192, //小于指定值进行base64 编码
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      },
      // 处理 vue单文件 组件对象
      {
        test: /\.vue$/,
        // include: path.resolve(__dirname, 'src'),
        loader: 'vue-loader'
      }
    ]
  },

  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 将哪个页面作为模板页面处理(在根目录查找)
      filename: 'index.html', // 生成页面(在output指定的path下)
    }),
    new VueLoaderPlugin(),
  ],

  // 开发服务器的位置
  devServer: {
    port: 8200, // 自定端口号
    open: true, // 自动打开浏览器
    // quiet: true, // 不做太多日志输出
    //代理
    
  },

  //开启source-map调试  检测文件的错误
  devtool: 'cheap-module-eval-source-map',
  // 引入模块的解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名 顺序从左到右
    alias: { // 路径别名(简写方式)
      'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配 带vue编译器 from  'vue'
    }
  }
}