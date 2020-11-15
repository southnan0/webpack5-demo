const path = require("path");
const appPath = path.resolve(__dirname, "../../../src");
const projectConfig = require(path.resolve(appPath,'../vue.config.js'))

const Config = require('webpack-chain');
const webpackConfigFn = (env,config) => {
  // config.merge(projectConfig)
  const entry = {main:path.resolve(appPath, "main.ts")};
  const output = {
    filename:'main.js',
    path: path.resolve(appPath, '../contract')
  }
  const obj = {
    mode:env,
    resolve: {
      // 设置别名
      alias: {
        '@': appPath
      },
      extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm','.ts']
    },
    entry,
    output
  }

  config.merge(obj)
  require('./style')(env,config,{appPath});
  require('./vue')(env,config,{appPath});
  require('./devServer')(env,config,{appPath});
  require('./plugin')(env,config,{appPath});
  require('./base')(env,config,{appPath});
};

module.exports = (env)=>{
  const config = new Config();
  webpackConfigFn(env,config);
  return config.toConfig();
}
