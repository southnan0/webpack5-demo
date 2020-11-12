const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env,config,{appPath})=>{
  const pluginConfig = {
    plugin:{
      env:{
        plugin: webpack.EnvironmentPlugin,
        args:[{
          NODE_ENV:env,
          BASE_URL: process.env.BASE_URL
        }]
      },
      clean:{
        plugin:CleanWebpackPlugin
      },
      html:{
        plugin:HtmlWebpackPlugin,
        args:[{
          title:'Page',
          template: path.resolve(appPath,'../public/index.html'),
          templateParameters:{
            ...process.env
          }
        }]
      },
      vue3:{
        plugin:VueLoaderPlugin,
        args:[]
      }
    }
  }

  config.merge(pluginConfig)
}
