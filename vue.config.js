/*
 * @Author: your name
 * @Date: 2020-03-25 05:32:37
 * @LastEditTime: 2020-04-13 19:44:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\vue.config.js
 */
const webpack = require('webpack')
module.exports = {
  // pages: {
  //     index: 'src/main.js',
  //     subpage: 'src/subpage/main.js'
  // },
  // pluginOptions: {
  //     electronBuilder: {
  //         externals: ['electron-drag'],
  //         nodeModulesPath: ['./node_modules/electron', './node_modules/bindings']
  //     }
  // },
  // configureWebpack:{
  //     // enternals:{
  //     //     'electron-drag':'commonjs2 electron-drag'//无效electronBuilder 直接生效
  //     //}
  // }
	lintOnSave:false,
  configureWebpack:{
    devtool:'source-map',
    plugins:[
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV':false
      })
    ],
    module:{
      rules:[
        {
          test:/\.worker\.js$/,
          use:{loader:'worker-loader'}
          
        }
      ]
    }
  },
  chainWebpack: (config) => { //在vue/cli3使用 webpack-bundle-analyzer
    config.plugins.delete('prefetch')

    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    // config.resolve.alias
    //   .set("vue$", "vue/dist/vue.js")

      // config.plugin('define').tap(args =>{
      //   args[0].FLUENTFFMPEG_COV=false
      //   return args
      // })
  }
}
