const webpack = require('webpack');
const Config = require('webpack-chain');
const config = new Config();
const webpackConfigFn = require('../webpack/config/common.js')

const env = process.env.NODE_ENV || 'development';
webpackConfigFn(env,config)
webpack(config.toConfig(),(err,stats)=>{
    if(err || stats.hasErrors()){
        console.info(err || stats.hasErrors())
    }else{
        console.info('done')
    }
})
