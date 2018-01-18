const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',

    output: {
        path: path.resolve('./dist'),
        publicPath: 'http://localhost:3333/',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],

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
