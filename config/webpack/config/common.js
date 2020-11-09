const path = require("path");
const appPath = path.resolve(__dirname, "../../../src");
const projectConfig = require(path.resolve(appPath,'../vue.config.js'))
console.info(projectConfig);

module.exports = (env,config) => {

  config.merge({
    entry: path.resolve(appPath, "main.ts"),
    output: {
      path: path.resolve(appPath, `../${config.outputDir || 'dist'}`),
      filename:'mian.js'
    }
  })

  require('./style')(env,config);
  require('./vue')(env,config);
};
