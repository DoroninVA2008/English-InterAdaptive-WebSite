const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const portfinder = require('portfinder');

// Базовый порт, с которого начинаем проверку
const basePort = 1706;

module.exports = async () => {
    // Находим свободный порт, начиная с basePort
    const port = await portfinder.getPortPromise({
        port: basePort,
        stopPort: basePort + 100 // максимум +100 портов
    });

    if (port !== basePort) {
        console.log(`\n⚠️  Порт ${basePort} занят, используем порт ${port}\n`);
    }

    return {
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
            port: port,
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
                filename: 'NeiroBootStrap.html', // NeiroBootStrap.html
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
};