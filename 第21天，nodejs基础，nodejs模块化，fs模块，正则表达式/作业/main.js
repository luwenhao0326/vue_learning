var fs = require("fs");
fs.readFile("./将夜.html", function (err, data) {
    if (!err) {
        var str = data.toString();
        var reg = /1[356789]\d{9}/g;
        var res;
        var num = [];
        while (res = reg.exec(str)) {
            num.push(res[0]);   
        }
        fs.writeFile("./file.txt",num,function(err){  
        });
    } else {
        console.log(err);
    }
});


