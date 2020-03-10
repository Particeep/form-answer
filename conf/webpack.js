const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/app/index.html'),
        }),
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
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
                loader: 'style-loader?{attrs:{"form-answer-css":""}}!css-loader?importLoaders=1&localIdentName=[local]_[hash:base64:5]!sass-loader'
            }
        ]
    },
};
