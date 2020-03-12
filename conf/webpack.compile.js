const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: ['react'],
          amd: 'react',
        },
      },
      /@material-ui\/core\/.*/,
    ],
    entry: path.resolve('./src/lib/index.ts'),
    output: {
        path: path.resolve('./compile'),
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
});
