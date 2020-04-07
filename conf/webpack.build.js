const webpack = require('webpack');
const commonConfig = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');
const path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  cache: true,
    devtool: 'source-map',
    target: 'web',
    entry: {
        'vendor': ['babel-polyfill', path.resolve('src/app/vendor.ts')],
        'app': path.resolve('src/app/index.tsx'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
                'NODE_PATH': 'src/app'
            }
        })
    ],
    optimization: {
      minimize: true,
      noEmitOnErrors: true,
      removeAvailableModules: false
    },
    output: {
        path: path.resolve('./build'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },
});
