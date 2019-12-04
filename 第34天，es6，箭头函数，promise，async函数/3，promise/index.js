let fs = require("fs");

// fs.readFile("./f1.txt",function(err,d1){
//     fs.readFile("./f2.txt",function(err,d2){
//         let total = d1.toString()+d2.toString();
//         console.log(total);
//     });
// });

// 当有一段代码需要在多个异步任务都完成时才执行，使用回调函数控制会非常麻烦：

// 1，回调函数需要多层嵌套。
// 2，多个异步任务的执行是串行的，而不是并发的。


// ----------------------------------------------

// ES6中，为了解决js的回调函数多层嵌套问题，增加了Promise对象。用于封装异步任务。

// 使用构造函数创建Promise对象，参数是一个函数，函数中写异步任务的代码。
// 参数函数中有两个参数，resolve,reject，这两个参数也是函数。
// Promise对象创建之后会立刻调用异步任务所在的函数
let p1 = new Promise(function(resolve,reject){
    fs.readFile("./f1.txt",function(err,data){
        if(!err){
            // 异步任务执行成功时调用resolve。如果是读取，请求等异步任务，获取到了一段数据，那么一般情况下需要将数据作为参数调用resolve，这段数据会传给promise的.then回调函数
            resolve(data);
        }else{
            // 失败时调用reject，需要传递err对象
            reject(err);
        }
    })
});

// promise对象有一个“状态”属性，刚创建成功的promise处于待定状态(pending)。如果promise中函数调用了resolve(异步任务成功)，则由待定状态转为完成状态(success)，如果promise中的函数调用了reject(异步任务失败),则会由待定状态转为失败状态(fail)。一个promise对象的状态一旦由待定转为成功或失败，则它的状态不能再改变。


// Promise对象的.then方法，用于为promise对象添加任务成功时的回调函数。回调函数会在promise对象变为完成状态时执行，如果promise已经处于完成状态，则会立刻执行
p1.then(function(d){
    // console.log("文件读取成功");
    // console.log(d.toString());
    
    
});

// Promise对象的.catch方法，为promise对象添加任务失败时的回调函数。回调函数会在promise变为失败状态时执行，如果promise已经是失败状态则会立刻执行。
p1.catch(function(err){
    // console.log("文件读取失败");
});

// ----------------------------------------------

// 对于promise对象，一般不会直接去封装一个异步任务，而是将封装promise的过程写成一个方法，专门用于封装某种类型的异步任务，例如，对于文件读取，可以写一个自己的myReadFile，返回一个promise

function myReadFile(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(!err){
                resolve(data.toString());
            }else{
                reject(err);
            }
        });
    });
}

// myReadFile("./f1.txt")
// .then(function(data){
//     console.log(data);
// })
// .catch(function(err){
//     console.log(err);
// })

// 使用promise版文件读取两个文件内容并拼接
// 多异步任务必须先后执行:
let d1;
myReadFile("./f1.txt")
.then(function(data){
    d1 = data;
    // 在一个promise对象的.then函数中，可以return另一个promise对象。 .then方法的返回值就是这个新的promise对象，所以可以再次.then添加新的promise的.then方法。
    return myReadFile("./f2.txt");
})
.then(function(data){
    // console.log(d1+data);
})
// 多promise连续.then时，最后只需要一个.catch
.catch(err=>{
    console.log(err);
})

// 多异步任务并发执行
let p2 = myReadFile("./f1.txt");
let p3 = myReadFile("./f2.txt");

// Promise.all方法，将多个promise对象合并为一个promise对象，当合并的每一个promise对象都变为完成状态时时，总的promise对象才变为完成状态。只要有一个promise失败，总的promise对象就变为失败状态。
let total = Promise.all([p2,p3]);


total.then(function(data){
    // 合并之后的promise对象的.then函数中，参数是一个数组，数组中记录了参与合并的每个promise对象.then时的参数。
    console.log(data.join(""));
})
.catch(function(err){
    console.log(err);
})



