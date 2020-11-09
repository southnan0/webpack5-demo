modules.export = (env,config)=>{
  
  const pluginConfig = {
    plugin:{
      env
    }
  }

  config.merge(pluginConfig)
}