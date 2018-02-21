const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    cache: true,
    devtool: 'source-map',
    target: 'web',
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    entry: {
        'app': path.resolve('src/app/index.jsx'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('src/app/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV),
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
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'commonjs2',
    },
};
