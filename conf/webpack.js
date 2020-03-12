const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
      },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/app/index.html'),
        }),
    ],
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              exclude: [/node_modules/],
              use: { loader: 'babel-loader' }
            },
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
              ]
            },
            {
              test: /\.scss$/,
              exclude: [/node_modules/],
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
              ]
            }
        ]
    },
};
