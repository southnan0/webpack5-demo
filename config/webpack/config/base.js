module.exports = (env,config,{appPath})=>{
  const baseConfig = {
    module:{
      rule:{
        ts:{
          test:/\.ts$/,
          loader:'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        },
        file:{
          test: /\.(png|jpe?g|gif)$/i,
          use: [{
            loader: 'file-loader',
          }]
        }
      }
    }
  }
  config.merge(baseConfig)
}