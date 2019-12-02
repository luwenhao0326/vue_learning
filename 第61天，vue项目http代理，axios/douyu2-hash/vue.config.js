
module.exports = {
    devServer:{
        proxy:{
            "/proxy":{
                target:"http://192.168.6.18:8090",
                changeOrigin:true,
                pathRewrite:{
                    "^/proxy":""
                }
            }
        }
    }
}