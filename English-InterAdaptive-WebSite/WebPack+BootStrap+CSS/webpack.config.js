const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    experiments: {
        css: false
    },
    entry: {
        bundle: './src/js/script.js',
    },
    output: {
        filename: 'Strap.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    devServer: {
        static: './dist',
        port: 1706,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html', // NeiroBootStrap.html
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: 'public' }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'BootStrap.css',
        }),
    ],
};