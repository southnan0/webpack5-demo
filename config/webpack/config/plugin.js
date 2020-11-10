const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

modules.export = (env,config)=>{

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
          template:
        }]
      }
    }
  }

  config.merge(pluginConfig)
}
