const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            __COMPONENTS: path.resolve(__dirname, 'src/components/'),
            __IMAGES: path.resolve(__dirname, 'src/images/'),
            __STYLES: path.resolve(__dirname, 'src/styles/'),
            __API: path.resolve(__dirname, 'src/api/'),
            __CONSTANTS: path.resolve(__dirname, 'src/constants')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: 'file-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "./fonts/[name].[ext]",
                            outputPath: "fonts/",
                        },
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: true
    }
}
