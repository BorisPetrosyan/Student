const HtmlWebpackPlugin = require('html-webpack-plugin')
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
//const path = require('path')


module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    }
}