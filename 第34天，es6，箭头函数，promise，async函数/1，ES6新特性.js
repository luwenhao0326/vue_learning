// W3C(万维网联盟),负责制定html,css和webAPI(使用js在浏览器环境下能够调用的功能)标准。

// ECMA(欧洲计算机制造协会)，负责制定js标准，所以javascript又叫ecmascript。
// js从出现到现在已经历时多个版本，在html5之前，使用的都是es第五个版本，随着h5出现，es更新了第6个版本，也就是es6，(目前，es7版本正在测试阶段)。


// ------------------------------------------
// ES6在ES5的基础上扩展了一些新的语法和新的功能。

// 1，增加了块级作用域变量。

// var 是声明 函数级作用域  变量。使用var 声明的变量，其作用域是当前函数体内
// let 用于声明 块级作用域变量。let声明的变量，其作用域是当前代码块。

// function f1() {
//     if (5 > 3) {
//         var a = 10;
//         let b = 20;
//     }
//     console.log(a);
//     console.log(b);
// }

// f1();

// ---------------------------------------------
// 2，增加了常量
// 常量声明之后只能赋值一次。
// const pi = 3.14;
// pi = 100;
// console.log(pi);

//-----------------------------------------------
// 增加了变量解构赋值。可以用于对象也可以用于数组。

// let obj = {
//     name: "zxf",
//     age: 20,
//     gender: true
// }

// let name = obj.name;
// let age = obj.age;
// let gender = obj.gender;

// 对象的解构赋值，相当于使用若干个变量，指向一个对象中的对应属性。
// let { name, age, gender } = obj;

// console.log(name);
// console.log(gender);

// 数组的解构赋值
// let arr = ["html", "js", "css"];
// let a0 = arr[0];
// let a1 = arr[1];
// let a2 = arr[2];

// let [a0, a1, a2] = arr;
// console.log(a0);
// console.log(a1);
// console.log(a2);


// 解构赋值可以用于参数类型是对象的函数。


// function f2({ name, age, gender }) {
    // console.log(name);
    // console.log(age);
    // console.log(gender); 
// }

// f2({
//     name:"zxf",
//     gender:false
// })


// --------------------------------------------
// 增加了字符串模板功能

// let s1 = "我叫" + name + ",今年" + age + "岁";

// // 使用 反撇号 创建字符串模板，在字符串模板中可以通过${xxxx}插入变量或表达式的值，同时字符串模板中可以换行
// let s2 = `我叫${name},今年${age}岁`;

// console.log(s2);

// --------------------------------------------
// 增加了对象合并方法

// let o1 = { p1: "v1", p2: "v2" };
// let o2 = { p2: "vvvv", p3: "v3" };

// // Object.assign，用于合并对象，将第二个参数开始的对象的属性都赋值到第一个对象上
// Object.assign(o1, o2);
// console.log(o1);

// ---------------------------------------------

// 扩展了数组的一些方法。

let array = [ 1,2,3,4,5,6,7,9,8,10];
// array.sort(function(e1,e2){
//     return e2-e1
// });
// // console.log(array);


// let array2 = [
//     {
//     name: "王",
//     age: 10
//     }, 
//     {
//         name: "李",
//         age: 15
//     }, 
//     {
//         name: "赵",
//         age: 8
//     }
// ]
// // 数组的.sort方法，用于数组排序，不写参数时只能用于数字的从小到大排序，参数是一个排序函数，
// // 排序函数有两个函数，分别表示数组中的两个元素，排序函数需要返回一个数字来指定规则。返回正数表示交换位置，返回负数不交换位置
// array2.sort(function(e1,e2){
//     return e1.age-e2.age;
// });
// console.log(array2);

// 数组.map方法，使用一个遍历函数计算数组中的每一个元素，将返回的结果形成一个新的数组
array.map(function(el){
    Set(array,"a","")
});

console.log(array)

// // 数组.reduce方法，遍历数组，将每一次遍历计算的结果传递给下一次遍历参数，并将最终的计算结果作为reduce方法的返回值
// let sum = arrRes.reduce(function(prev,el){
//     return prev+el;
// })
// console.log(sum);

// ------------------------------------------
// 新的对象字面量语法

// let width = 100;
// let height = 150;

// let rect = {
//     width,
//     height,
//     rotate(){
//         console.log("rotate方法执行了");
        
//     }
// }

// rect.rotate();

// // ---------------------------------------------
// // 新增了类的声明方法，class关键字
// // -----------老写法(两种写法其实结果一样)------------
// // function People(name,age){
// //     this.name = name;
// //     this.age = age;
// // }

// // People.prototype.say = function(){
// //     console.log(`我是${this.name}`);
    
// // }

// // function Man(name,age,huzi){
// //     People.call(this,name,age);
// //     this.huzi = huzi;
// // }

// // Man.prototype = Object.create(People.prototype);
// // Man.prototype.chouyan = function(){
// //     console.log("抽烟");  
// // }

// // 语法糖 (例如：三目运算符就是if else的语法糖)
// // --------新写法----------

// // 在es6中，可以使用class关键字声明一个类。
// class People{
//     // 在类的声明代码中，constructor用于指定构造函数
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     // 类声明代码中，可以直接添加方法
//     say(){
//         console.log(`我是${this.name}`);
//     }
// }

// // let p1 = new People("zxf",20);
// // p1.say();

// // 声明一个类之后可以使用extends关键字指定继承于另一个类
// class Man extends People{
//     constructor(name,age,huzi){
//         // 继承父类之后，在构造函数中需要调用super来执行父类的构造函数。
//         super(name,age);
//         this.huzi = huzi;
//     }
//     chouyan(){
//         console.log("抽烟");
//     }
// }

// class关键字声明类 仅仅是一种新的语法，js中实现面向对象的本质还是通过原型链。只不过原型链不用再显示的声明





