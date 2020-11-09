modules.export = (env,config)=>{
  
  const vueConfig = {
    module:{
      rule:{
        vue:{
          test: /\.vue$/,
          use: {
            loader: require('vue-loader'),
            options: {
              compilerOptions:{
                whitespace:'condense'
              }
            }
          }
        }
      }
    }
  }
  
  config.merge(vueConfig)
}