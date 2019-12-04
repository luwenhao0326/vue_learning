
var abc = 100;

function jiecheng(n){
    var j =1;
    for(var i = n;i>0;i--){   
        j*=i;
    }
    return j;
}

//module.exports表示本js文件所导出的内容，默认是一个空对象。
// 通过给module.exports赋值可以设置本js文件所导出的内容。
module.exports = jiecheng;
