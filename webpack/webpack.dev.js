const config = require('./webpack.config');

const port = 9090 + Math.floor(Math.random() * 100);
const host = '127.0.0.1';
// 本地环境静态资源路径
const localPublicPath = `http://${host}:${port}/wq/`;

config.output.publicPath = localPublicPath;
config.devtool = '#eval'; // 调试版要开启sourcemap
config.plugins.shift(); // 调试版不需要清空dist文件夹

// 开启文件监听
config.watch = true;
config.watchOptions = {
    ignored: /node_modules/,
    aggregateTimeout: 1000,
    poll: 1000
};

config.devServer = {
    inline: true,
    compress: true,
    hot: true,
    proxy: proxy(),
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    historyApiFallback: true,
    port,
    host,
    open: true,
    openPage: 'wq/template/index.html'
};

function proxy() {
    const base = {
        secure: true,
        changeOrigin: true
    };
    return {
        '**': {
            ...base,
            bypass: req => req.url.replace('wq', 'wq/views')
        }
    };
}

module.exports = config;
