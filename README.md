### webpack
* html
    * html模板
    * html文件加入变量
    * html文件里的img   //暂未实现
* css
    * 使用sass
    * 压缩
    * 添加兼容性
    * 背景图片打包
    * css modules   //html页面好像不能使用
    * 添加前缀  //sass文件添加前缀没有成功
* js
    * 使用es6
    * 压缩
* 其他文件
    * html里的图片src
    * css里的背景图片
    * js引入的图片
    * 其他文件的引入
* 服务器配置
    * 热更新（未实现）
#### loading说明
* sass-loader
* url-loader

#### 插件说明
* html-webpack-plugin：生成html文件
* extract-text-webpack-plugin单独提取css文件
* uglifyjs-webpack-plugin压缩js