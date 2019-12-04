console.log("helloworld");

// 在浏览器中运行js时，全局对象是 window 。
// 在nodejs中，没有window
// 在nodejs中，全局对象是global对象


// function f1(){
//     console.log(this);
// }
// f1();

// console.log(global);

//---------------------------------------------

// nodejs是独立的js运行环境，不是浏览器，所以浏览器提供的webAPI在nodejs中都不能使用。
// 例如document，history，navigator，location，alert等。
// document.write("123");


// ---------------------------------------------

// js的内置对象在nodejs中都可以使用，例如，数组，字符串，日期类等。

var now = new Date();
console.log(now.getHours());


