const path = require('path');
const HWP = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//  module.exports = {
//     entry: path.join(__dirname, 'src', 'index.js'),
//     mode: 'development',
//     output: {
//         filename: 'build.js',
//         path: path.join(__dirname, '/dist')},
//     module:{
//         rules:[{
//            test: /\.js$/,
//            exclude: /node_modules/,
//            loader: 'babel-loader'
//         }]
//     },
//     plugins:[
//         new HWP(),

//     ]
//  }
var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');
module.exports = {

    entry: path.resolve(APP_DIR + '/index.js'),
    output: {
        filename: 'build.js',
        path: BUILD_DIR
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|.json)$/,
                include: APP_DIR,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            {
                test: /\.(gif|png|jpe?g|pdf)$/i,
                use: [
                    'file-loader',
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         bypassOnDebug: true, // webpack@1.x
                    //         disable: true, // webpack@2.x and newer
                    //     },
                    // },
                ],
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        moduleExtensions: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    devServer: {
        contentBase: "./public/",
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'node_modules/pdfjs-dist/cmaps/',
                to: 'cmaps/'
            },
        ]),
    ]
};