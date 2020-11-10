module.exports = (env,config)=>{
    config.merge({
        devServer:{
            contentBase: config.toConfig().output.path,
            compress:true,
            port:8080
        }
    })
}
