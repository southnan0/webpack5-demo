const path = require("path");
const appPath = path.resolve(__dirname, "../../../src");
const projectConfig = require(path.resolve(appPath,'../vue.config.js'))

module.exports = (env,config) => {
  config.merge(projectConfig)
  const entry = path.resolve(appPath, "main.ts");
  const output = {
    path: path.resolve(appPath, `../${config.get('outputDir') || 'dist'}`),
    filename:'mian.js'
  }
  const obj = {
    entry,
    output
  }

  config.merge(obj)
  require('./style')(env,config,{appPath});
  require('./vue')(env,config,{appPath});
  require('./devServer')(env,config,{appPath});
};
