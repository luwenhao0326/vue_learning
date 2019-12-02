module.exports = {
    devServer:{
        proxy:{
            "/douyu":{
                target:"http://open.douyucdn.cn",
                changeOrigin:true,
                pathRewrite:{
                    "^/douyu":""
                }
            }
        }
    }
}