const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // https://stackoverflow.com/questions/56573363/react-router-v4-nested-routes-not-work-with-webpack-dev-server
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            __COMPONENTS: path.resolve(__dirname, 'src/components/'),
            __IMAGES: path.resolve(__dirname, 'src/images/'),
            __STYLES: path.resolve(__dirname, 'src/styles/'),
            __API: path.resolve(__dirname, 'src/api/'),
            __CONSTANTS: path.resolve(__dirname, 'src/constants/'),
            __SERVICES: path.resolve(__dirname, 'src/services/'),
            __ROUTES: path.resolve(__dirname, 'src/routes/')
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
        compress: true,
        // https://stackoverflow.com/questions/56573363/react-router-v4-nested-routes-not-work-with-webpack-dev-server
        historyApiFallback: true
    }
}
