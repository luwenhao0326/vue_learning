
// 从vue-cli3.0开始，项目中不再自带配置文件，若需对项目进行配置，则必须手动创建vue.config.js

module.exports = {

    // devServer是对开发服务器的配置，可以设置服务器使用的端口号等，也可以设置代理
    devServer:{

        // 设置服务器的代理规则
        proxy:{

            // 收到的请求中路径凡是/proxy开头的请求，都会被代理到target服务器中。
            "/proxy":{
                // 目标服务器
                 
                target:"http://open.douyucdn.cn",
                changeOrigin:true,
                pathRewrite:{
                    "^/proxy":""
                }
            }
        }
    }
}