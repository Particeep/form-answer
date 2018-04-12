const path = require('path');

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader"},
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
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    },
    entry: path.resolve('./src/lib/index.js'),
    output: {
        path: path.resolve('./build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
};