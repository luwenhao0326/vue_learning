function parseBody(req,res,next){
    if(req.method == "POST" && req.headers["content-type"] == "application/x-www-form-urlencoded"){
        var totleData = new Buffer("");
        req.on("data",function(d){
            totleData+=d;
        });
        req.on("end",function(){
            var str = totleData.toString();
            var params = str.split("&");
            req.body = {};
            params.forEach(function(el){
                var arr = el.split("=");
                req.body[arr[0]] = arr[1];
            })
            next();
        });
    }else{
        next();
    }

    
}


module.exports = parseBody;