/* eslint-disable camelcase,no-console */
const path = require('path');
const fs = require('fs');
const os = require('os');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack'); // 多进程打包

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 进程池初始化

const isProduction = process.env.NODE_ENV === 'production'; // 是否是发布版
const isDev = process.env.NODE_ENV === 'dev'; // 是否是本地开发版，是的话用css-hot-loader。目前只有npm start采用该方式
const compilePath = (process.argv.find(commend => commend.indexOf('--env.pt=') === 0) || '').replace('--env.pt=', ''); // 在start中控制局部编译

const entries = {
    libs: [
        'babel-polyfill', // 需要兼容低版本ie，放在最前面
        'raf/polyfill', // 需要兼容低版本ie，放在最前面
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'redux-thunk',
        'prop-types',
        'axios',
        'highcharts'
    ]
};

// 组装插件
function getPlugins() {
    const plugins = [
        new CleanWebpackPlugin('./build/*', {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/static/img/favicon.png'),
            to: path.resolve(__dirname, '../build/static/img/favicon.png')
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        // build版和release版以hash作为模块id，避免文件非预期变更
        isDev ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 20
        })
    ];
    // 处理html
    /* 过滤掉fragment文件夹 */
    fs.readdirSync('src/views/').filter(m => m !== 'fragment' && m !== '.DS_Store').forEach(moduleName => {
        // 每个module内还有若干页面
        fs.readdirSync(`src/views/${moduleName}`).forEach(page => {
            // 探查对应的js是否存在
            const chunk = `${moduleName}/${page.replace('.html', '')}/main`;
            let isE = fs.existsSync(`src/static/js/${moduleName}/${page.replace('.html', '')}/main.jsx`);
            const template = `src/views/${moduleName}/${page}`;
            if (isDev) {
                // 如果是开发状态，且有局部路径，但是路径未匹配上，则不去编译；template的默认要编译
                isE = !compilePath.length || template.indexOf(compilePath) !== -1 || moduleName === 'template';
            }
            if (isE) {
                entries[chunk] = path.resolve(__dirname, `../src/static/js/${moduleName}/${page.replace('.html', '')}/main.jsx`);
            }
            !isDev && !isE && console.log('未命中', template, compilePath);
            plugins.push(new HtmlWebpackPlugin({
                // 模板为同级目录下的index.html，为何不用写路径，是因为默认上下文问webpack.config.js所在的文件夹
                template,
                // 自动生成HTML文件的名字,可以嵌套文件夹
                filename: `views/${moduleName}/${page}`,
                chunks: ['manifest', 'libs'].concat(isE ? [chunk] : []),
                multihtmlCache: true, // 多页优化配置
                minify: {
                    // 配置详见：https://github.com/jantimon/html-webpack-plugin#options
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true
                }
            }));
        });
    });
    plugins.push(new ExtractTextPlugin({
        filename: `static/style/[name]${isProduction ? '-[contenthash:10]' : ''}.css`
    }));
    // 生产版添加production环境变量，详见：https://react.docschina.org/docs/optimizing-performance.html
    isProduction && plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    // 生产版添加js压缩
    isProduction && plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false,
            collapse_vars: true,
            reduce_vars: true
        },
        output: {
            comments: false,
            beautify: false
        },
        sourceMap: true
    }));
    return plugins;
}

const config = {
    entry: entries,
    devtool: isProduction ? 'hidden-source-map' : '#eval', // 生成map文件，但是js不引用
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: `static/js/[name]${isProduction ? '-[chunkhash:10]' : ''}.js`,
        // 用于设定css中引用img的路径
        publicPath: '/wq/'
    },
    plugins: getPlugins(),
    module: {
        // loaders加载器
        loaders: [
            // loader
            {
                test: /\.s?css$/,
                use: (isDev ? ['css-hot-loader'] : []).concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer({
                                    browsers: ['> 1%', 'cover 99.9%', 'since 2010']
                                })]
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: false
                            }
                        }
                    ]
                }))
            }, {
                test: /\.(js|jsx)$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /(node_modules)|(unbabel)/, // 屏蔽不需要处理的文件（文件夹）（可选）
                use: 'happypack/loader?id=happybabel' // loader的名称（必须）
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: `static/img/[folder]/[name]${isProduction ? '-[hash:10]' : ''}.[ext]`
                    }
                }]
            }, {
                test: /\.(ttf|eot|woff)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: `static/font/[name]${isProduction ? '-[hash:10]' : ''}.[ext]`
                    }
                }]
            }, {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        name: `static/js/[name]${isProduction ? '-[hash:10]' : ''}.[ext]`
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
        alias: {
            utils: path.resolve(__dirname, '../src/static/js/utils/'),
            style: path.resolve(__dirname, '../src/static/style/'),
            '@jd/react-grace': '@jd/react-grace/dist/widget/'
        }
    }
};

module.exports = config;
