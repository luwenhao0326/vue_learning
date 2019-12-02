
// webpack的配置文件需要导出一个配置对象

// webpack的配置文件是使用nodejs运行的，所以必须使用nodejs模块化。

module.exports = {
    // 设置打包的入口文件
    entry:"./main.js",
    // 设置打包之后的输出文件
    output:{
        filename:"index.js",
        path:__dirname
    }
}