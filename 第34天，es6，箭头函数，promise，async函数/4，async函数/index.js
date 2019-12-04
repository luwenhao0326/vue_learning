let fs = require("fs");


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


// async 关键字写在一个函数前，用于声明这个函数内部需要执行异步任务，并且可以使用await执行异步任务。(await只能出现在async修饰的函数体中)
async function printFiles(){
    // await关键字，加在函数调用之前(必须是返回promise对象的函数才能使用await调用)，使用await调用这个函数，返回时不再是promise对象，而是promise对象.then时获得的参数。
    // 并且会将这行代码之后，async函数结束前的所有代码转移到本异步任务完成之后在执行。
    let d1 = await myReadFile("./f1.txt");
    let d2 = await myReadFile("./f2.txt");
    console.log(d1+d2);
}

printFiles();

console.log(123);
