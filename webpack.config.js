
var webpack=require('webpack');
var HtmlwebpackPlugin=require('html-webpack-plugin');//html-webpack-plugin 插件  自动生成html
//自动打开浏览器
var OpenBrowserPlugin=require('open-browser-webpack-plugin');
var path=require('path');
var ROOT_PATH=path.resolve(__dirname); //__dirname获得当前文件所在目录的完整目录名
var APP_PATH=path.resolve(ROOT_PATH,'app');  //resolve 解析到一个绝对路径里  ROOT_PATH/app
var BUILD_PATH=path.resolve(ROOT_PATH,'build');
console.log(process.env.NODE_ENV)
module.exports={ 
    entry:APP_PATH+'/index.jsx',//入口 默认index.js
    output:{
        path:BUILD_PATH,
        filename:'bundle.js'
    },
    module:{
        rules:[
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use:[
                {
                    loader:'babel-loader',
                    options:{
                        presets:['react']
                    }
                }
                ]
            },
            { test: /\.less$/, exclude: /node_modules/, use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{importLoaders:1}//这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
                    },
                    {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(), //CSS浏览器兼容
                                require('cssnano')()  //压缩css
                            ]
                        }
                    },
                    {
                        loader:'less-loader',
                        options:{importLoaders:1}
                    }
                ]
            },
            { test: /\.css$/, exclude: /node_modules/, use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{importLoaders:1}//这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
                    },
                    {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(), //CSS浏览器兼容
                                require('cssnano')()  //压缩css
                            ]
                        }
                    }
                ]
            },
            { test:/\.(png|gif|jpg|jpeg|bmp)$/i, use:['url-loader']},  // 限制大小5kb
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, use:['url-loader']} // 限制大小小于5k

        ]
    },
    resolve:{
            //创建快捷引入路径
            alias: {
                // Utilities: path.resolve(__dirname, 'src/utilities/'),
                // Templates: path.resolve(__dirname, 'src/templates/')
            },
            //require的时候 不写后缀名  用extensions去匹配后缀
            extensions:['.js','.jsx']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {

            },
                

        }),
        //自动生成html
        new HtmlwebpackPlugin({
            //模版
            template:APP_PATH+'/index.tmpl.html'
        }),
        //自动打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8881'
        }),
        //热加载插件 webpack-dev-server 自带
        new webpack.HotModuleReplacementPlugin(),
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],
    devServer: {
        proxy:{
                '/api':{
                    target:'http://localhost:3000',
                    secure:false
                }
        },
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }    

}