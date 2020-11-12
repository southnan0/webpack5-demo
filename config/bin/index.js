const Webpack = require('webpack');
const path = require('path')
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/config/common.js')

const env = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path:path.resolve(__dirname,`../../.env.${env}`)
  })

const webpackConfig = config(env)

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    hot:true,
    stats: {
        colors: true,
    },
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(webpackConfig.devServer.port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${webpackConfig.devServer.port}`);
});
