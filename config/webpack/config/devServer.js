const path = require('path')

module.exports = (env,config)=>{
    config.merge({
        devServer:{
            contentBase: path.join(__dirname, 'dist'),
            compress:true,
            port:8081
        }
    })
}
