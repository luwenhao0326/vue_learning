// 在nodejs中，能够调用操作系统所提供的一些API（application program interface）。
// 例如文件功能，网络功能等。

// 对于每个功能，nodejs都封装在了一个模块中，


// require函数的参数如果是一个 ./开头的路径表示导入一个js文件。
// 如果参数是一个非路径的字符串，则表示导入一个模块（可以是nodejs自带的模块，也可以是第三方的模块）

// fs模块：file system，文件系统模块，用于操作计算机的文件存储。
// 导入fs模块之后会得到一个对象，这个对象的方法用于操作文件。
var fs = require("fs");

// console.log(fs);

// fs.writeFileSync方法，用于向一个文件中写入一段数据，文件不存在则会创建，已存在则会覆盖。
// 第一个参数是要存储的文件的路径(所在文件夹和文件名),第二个参数是要存储的数据内容。
// fs.writeFileSync("./file.txt","张雪峰");

// fs.writeFile,写入文件方法的异步版，前两个参数和同步版相同，第三个参数是写入完毕时的回调函数，当数据写入完毕时，就会调用这个函数。
fs.writeFile("./file.txt","zxf",function(err){
    // console.log("文件存储完毕");
    // nodejs中的大部分的回调函数的第一个参数参数都是错误对象err，如果本次任务执行成功了，那么err为空，如果任务执行失败，那么err就是错误对象，对象中存储着错误原因。
    // if(!err){
    //     console.log("执行成功了");
    // }else{
    //     console.log(err);   
    // }
    
});

//--------------------------------------------------


// synchronize,同步的  sync
// asynchronize,异步的 async

// fs模块中的每个方法都有同步版和异步版两个版本，以Sync结束的方法是同步版，非Sync结束的方法是异步版。
// 同步函数：函数中的任务在执行完毕之前函数不会结束，而是处于阻塞状态，直到函数任务执行完毕，函数结束，代码继续往下执行。

// 异步函数：函数任务在后台执行，不阻塞当前线程，当前代码继续向下执行。在任务执行完毕时会调用回调函数。

// 对于耗时较长或者耗时不稳定的任务（例如文件读写，网络请求，数据库查询等），使用同步执行会导致线程阻塞，降低执行效率，而使用异步执行，则可以避免线程阻塞。
//--------------------------------------------------

// fs.readFileSync读取某文件中的内容，参数是要读取的文件的路径。返回值是读取的数据，是buffer类型，可以通过toString方法转为字符串
var data1 = fs.readFileSync("./file.txt");
// console.log(data1.toString());


// fs.readFile,异步读取文件内容，第一个参数是文件路径，第二个参数是读取完毕的回调函数
fs.readFile("./file.txt",function(err,data2){
    // 回调函数的第一个函数是错误对象，第二个参数是读取到的数据。
    if(!err){
        console.log(data2.toString()); 
    }else{
        console.log(err); 
    }
});

// ---------------------------------------------

// fs.mkdir,创建文件夹

// fs.mkdir("./qwe",function(err){
//     if(!err){
//         console.log("文件夹创建成功");   
//     }else{
//         console.log(err);      
//     }
// })

// -------------------------------------------------
// fs.copyFile 复制文件
// fs.copyFile("./file.txt","./qwe/qqq.txt",function(err){
//     if(!err){
//         console.log("复制成功");   
//     }else{
//         console.log(err);      
//     }
// })

// --------------------------------------------------
// fs.unlink 删除文件
// fs.unlink("./qwe/qqq.txt",function(err){
//     if(!err){
//         console.log("删除成功");   
//     }else{
//         console.log(err);      
//     }
// })

// --------------------------------------------------
// 判断某个文件或文件夹是否存在
fs.exists("./qwe/qqq.txt",function(flag){
    console.log(flag);
});

