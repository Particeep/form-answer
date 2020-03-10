const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    entry: path.resolve('./src/lib/index.ts'),
    output: {
        path: path.resolve('./compile'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
});