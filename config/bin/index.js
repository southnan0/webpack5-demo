const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/config/common.js')

const env = process.env.NODE_ENV || 'development';
const webpackConfig = config(env)

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    stats: {
        colors: true,
    },
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
});
