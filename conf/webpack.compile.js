const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    entry: path.resolve('./src/lib/index.ts'),
    output: {
        path: path.resolve('./compile'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
});
