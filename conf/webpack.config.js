const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
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
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'style-loader',
                  options: {
                    attributes: { 'form-answer-css': '' }
                  }
                },
                { loader: 'css-loader' }
              ]
            },
            {
              test: /\.scss$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'style-loader',
                  options: {
                    attributes: { 'form-answer-css': '' }
                  }
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                  }
                },
                { loader: 'sass-loader' }
              ]
            }
        ]
    }
};
