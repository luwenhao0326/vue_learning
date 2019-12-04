// path  ： 路径
// 在文件系统中，path表示一个文件路径，也就是这个文件所在的位置。

// 一个完整的路径，包括盘符,文件夹层次,文件名


// 例如     C:\users\appData\ddd.xxx


// 在nodejs中，使用字符串表示一个路径，可以是相对路径，也可以是绝对路径。

// 以盘符开头，或者/开头的路径是绝对路径，（/开头的路径相对于当前文件所在的盘符）

// 以./开头或者文件名开头的路径是相对路径，相对于当前运行的js文件所在的路径。


// -----------------------------------------------

// nodejs中 __dirname 表示当前js文件所在的文件夹路径。
// console.log(__dirname);

// ./也表示当前js文件所在的目录。


// path模块，用于处理文件路径，例如路径拼接，截取路径等。
var path = require("path");


// console.log(path);

var p1 = "C:\\Users\\Administrator\\Desktop\\InletexEMCFree汉化版.exe";

// path.extname 根据文件的路径获取他的扩展名
console.log(path.extname(p1));
// path.basename 获得文件的基础名
console.log(path.basename(p1));
// path.dirname获得文件所在的文件夹的路径
console.log(path.dirname(p1));

// path.isAbsolute判断一个路径是否为绝对路径
console.log(path.isAbsolute(p1));


var p2 = "./abc";
// path.resolve,把一个相对路径转为绝对路径
console.log(path.resolve(p2));


var p3 = "/abc/qwe";
var p4 = "/123/456";
// path.join ，将多个路径合并为一个路径 
var p5 = path.join(p3,p4);
console.log(p5);
