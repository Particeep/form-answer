const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    resolve: {
        root: path.resolve('src/app'),
        extensions: ['.js', '.json', '.jsx', ''],
    },
    resolveLoader: {
        root: [path.join(process.cwd(), 'node_modules')]
    },
    entry: {
        'vendor': path.resolve('src/app/vendor.js'),
        'app': path.resolve('src/app/index.jsx'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
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
    }
};
