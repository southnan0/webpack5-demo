module.exports = (env,config)=>{
  const vueConfig = {
    module:{
      rule:{
        vue:{
          test: /\.vue$/,
          use: [{
            loader: require.resolve('vue-loader'),
            options: {
              compilerOptions:{
                whitespace:'condense'
              }
            }
          }]
        }
      }
    }
  }

  config.merge(vueConfig)
}
