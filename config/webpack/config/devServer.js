const path = require('path')

module.exports = (env,config)=>{
    config.merge({
        devServer:{
            publicPath:path.join(__dirname, '../../../contract'),
            contentBase: path.join(__dirname, '../../../contract'),
            compress:true,
            port:8080
        }
    })
}
