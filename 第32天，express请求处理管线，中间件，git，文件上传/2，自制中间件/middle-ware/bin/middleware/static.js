
var url = require("url");
var path = require("path");
var fs = require("fs");
function makeFN(dir){
    function static(req,res,next){
        // req.url是一个字符串，可以使用url模块把它解析为一个url对象
        // console.log(req.url);
        var urlObj = url.parse(req.url);
        // console.log(urlObj.pathname);

        // 获得项目根目录
        var proPath = process.cwd();
        // 根据url中的路径拼接除访问的文件路径
        var filePath = path.join(proPath,dir,urlObj.pathname);
        // console.log(filePath);

        if(fs.existsSync(filePath)){
            if(fs.statSync(filePath).isDirectory()){
                // 是文件夹
                filePath = path.join(filePath,"index.html");
            }
        }
        

        if(fs.existsSync(filePath)){
                fs.readFile(filePath,function(err,data){
                    res.set("Content-Type","text/html;charset=utf-8");
                    res.send(data);
                })
        }else{
            next();
        }
    }
    return static;
}


module.exports = makeFN ;