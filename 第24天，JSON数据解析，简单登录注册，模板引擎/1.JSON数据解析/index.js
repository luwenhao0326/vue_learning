// var fs = require("fs");

var obj = {
    name:"zxf",
    age:12
}

// fs.writeFile把数据写入文件，只能写入字符串，不能直接把对象写入文件。
// 只有二进制数据能够直接存入文件，字符串可以按照某种编码格式（nodejs中默认使用utf-8）转为二进制数据，fs.writeFile方法第二个参数如果是字符串，那么nodejs会自动把它按照utf-8规则转为二进制数据然后存入文件，而对象类型会转为[object Object]，造成对象的属性丢失。

// fs.writeFile("./obj.txt",obj,function(err){
//     if(!err){
//         console.log("存储成功");
//     }else{
//         console.log(err);
//     }
// })


// fs.readFile("./obj.txt",function(err,data){
//     console.log(data.toString());
// })


// 如果要把对象存入文件，则必须把对象转为二进制数据。
// 把对象转为二进制数据的过程叫做 对象序列化。
// 把二进制数据转为对象的过程叫做 解析。


// 对象序列化有多种方式，目前最流行的是JSON格式。
// jaation (js 对象表vasvript object not示法)，它使用字符串表示一个对象。


var p1 = {
    name:"zxf",
    age:20,
    isMarried:false,
    father:{
        name:"zgc",
        age:55
    },
    friends:["赵大傻子","丁二愣子","王三瘸子"],
    speak:function(){
        console.log("hello");
    }
    
}


// JSON是js的内置对象，用于JSON对象序列和JSON解析。

// JSON.stringify用于将对象序列化为一个json字符串。只能记录对象的属性，不能记录方法。
var jsonStr = JSON.stringify(p1);

// json字符串和js对象字面量很像，但是有区别：
// 1.json字符串中属性名必须添加双引号
// 2.最后一个属性之后不能有逗号
// 3.json字符串中只能记录对象属性没有对象方法。

console.log(jsonStr);

// JSON.parse方法，将一个json字符串解析为对象。
var jsonObj = JSON.parse(jsonStr);

// console.log(jsonObj);


// 数组也可以直接序列化，但是在互联网中传输数据时，有一个约定俗成的规矩，json字符串必须以{}开头
var arr = [
    {name:"zxf",age:12},
    {name:"zzz",age:13}
]

var json2 = JSON.stringify(arr);

console.log(json2);

