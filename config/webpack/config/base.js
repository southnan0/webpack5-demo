module.exports = (env,config,{appPath})=>{
  const baseConfig = {
    module:{
      rule:{
        ts:{
          test:/\.ts$/,
          use:[{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env',
                [
                    '@babel/preset-typescript',
                  {
                    allExtensions:true
                  }
                ]]
            }
          }]
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
