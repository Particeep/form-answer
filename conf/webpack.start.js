const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    cache: true,
    devtool: 'eval-source-map',
    target: 'web',
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    entry: {
        'app': path.resolve('src/app/index.jsx'),
        'utils': require.resolve('react-dev-utils/webpackHotDevClient'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/app/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'NODE_PATH': 'src/app'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve('./src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                },
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1'
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?importLoaders=1&localIdentName=[local]_[hash:base64:5]!sass-loader'
            }
        ]
    },
    output: {
        path: path.resolve('./dist'),
        publicPath: 'http://localhost:3333/',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
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
};
