const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const prod = process.argv.indexOf('--production') !== -1;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

let config = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 3333,
        disableHostCheck: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 300
        }
    },
    resolve: {
        root: path.resolve('src/app'),
        extensions: ['.js', '.json', '.jsx', ''],
    },
    resolveLoader: {
        root: [path.join(process.cwd(), 'node_modules')]
    },
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve('src/app/index.jsx'),
    ],
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        // preLoaders: [{
        //     test: /\.(js|jsx)$/,
        //     loader: 'eslint',
        //     exclude: [/node_modules/]
        // }],
        loaders: [{
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.scss$/,
                /\.css$/,
                /\.json$/,
                /\.svg$/
            ],
            loader: 'url',
            query: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
            }
        }, {
            test: /\.css$/,
            loader: 'style!css?importLoaders=1'
        }, {
            test: /\.scss$/,
            loader: 'style!css?importLoaders=1&localIdentName=[local]_[hash:base64:5]!sass'
            // }, {
            // 	test: /\.scss$/,
            // 	loaders: ['raw-loader', 'sass-loader']
        }, {
            test: /\.(js|jsx)$/,
            include: [/(src|test)/],
            loader: 'babel'
        }]
    },
    eslint: {
        failOnError: true,
    }
};

config.plugins = config.plugins || [];

process.env.NODE_ENV = prod ? 'production' : 'development';

if (prod) {
    config = webpackMerge(config, {
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
                mangle: {
                    keep_fnames: true
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        htmlLoader: {
            minimize: true
        },
        output: {
            path: path.resolve('./dist'),
            filename: 'form-answer.js',
            sourceMapFilename: 'form-answer.map',
            library: 'form-answer',
            libraryTarget: 'umd'
        }
    });
} else {
    config = webpackMerge(config, {
        devServer: {
            historyApiFallback: true,
            inline: true,
            port: 3333,
            disableHostCheck: true
        },
        devtool: 'eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            })
        ]
    });
}

module.exports = config;