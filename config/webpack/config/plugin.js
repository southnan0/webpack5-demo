const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env,config)=>{

  const pluginConfig = {
    plugin:{
      env:{
        plugin: webpack.EnvironmentPlugin,
        args:[{
          NODE_ENV:env
        }]
      },
      clean:{
        plugin:CleanWebpackPlugin
      },
      html:{
        plugin:HtmlWebpackPlugin,
        args:[{
          title:'Page',
          template: path.resolve(config.appPath,'../public/index.html')
        }]
      }
    }
  }

  config.merge(pluginConfig)
}
