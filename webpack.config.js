const path = require('path');   //node的path模块，解析路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//单独提取css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
//
//

module.exports = {
    //入口
    entry: {
        'index': './app/pages/index/index.js',       //相对路径的写法
        'about': __dirname + '/app/pages/about/about.js',       ////绝对路径的写法
    },
    //输出
    output: {
        filename: "[name].js",          //打包后输出文件的文件名
        path: __dirname + "/public",     //打包后的文件存放的地方，必须是绝对路径
        publicPath: './'                //html里面引入的资源的路径
    },
    //source maps配置
    devtool: "eval-source-map",
    //webpack构建本地服务器
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        //port: "8001",
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    //Loaders
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }]
                })
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            title: '首页',
            filename: __dirname + '/public/index.html',
            chunks: ['index'],
            template: __dirname + "/app/pages/index/index.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new HtmlWebpackPlugin({
            title: '关于我们',
            filename: __dirname +  '/public/about.html',
            chunks: ['about'],
            template: __dirname + "/app/pages/about/about.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new ExtractTextPlugin('/css/[name].css')
    ],

};