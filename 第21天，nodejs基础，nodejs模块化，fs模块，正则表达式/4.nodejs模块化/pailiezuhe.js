
console.log(123);


// 使用require可以在一个js文件中导入另一个js文件。
// 参数表示要导入的js文件，内容是要导入的js文件的路径（可以是相对路径也可以是绝对路径）。
// 返回值是导入的js文件中所导出的内容。

//  ./ 表示本js文件所在的目录
var jiecheng =  require("./jiecheng.js");

// 使用require导入一个js文件仅仅是将这个js文件导出的内容导入，然后赋值给一个变量，并不会导入这个js文件中的其他内容，也就是说这两个文件的作用域是隔离的。
// console.log(abc);




function pailie(n,m){
    return jiecheng(n)/jiecheng(n-m);
}

function zuhe(n,m){
    return  jiecheng(n)/(jiecheng(m)*jiecheng(n-m));
}

// 使用module.exports只能导出一个内容，如果需要导出多个内容，可以把这些内容封装成一个对象，然后导出这个对象。
// 方法1
// module.exports = {
//     pailie,
//     zuhe:zuhe
// };


// 方法2
module.exports.pailie = pailie;
module.exports.zuhe = zuhe;