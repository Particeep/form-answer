const webpack = require('webpack');
const commonConfig = require('./webpack.js');
const webpackMerge = require('webpack-merge');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    cache: true,
    devtool: 'eval-source-map',
    target: 'web',
    entry: {
        'app': ['babel-polyfill', path.resolve('src/app/index.tsx')],
        'utils': require.resolve('react-dev-utils/webpackHotDevClient'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'NODE_PATH': 'src/app'
            }
        })
    ],
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
});
