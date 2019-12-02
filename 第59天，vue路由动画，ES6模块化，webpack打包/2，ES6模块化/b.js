let name = "zxf";

let age = 20;

let gender = false;

// es6模块化可以导出多个内容，导出多个内容时，export后不再添加default，而是跟一个{},在{}写需要导出的内容，格式很像对象字面量，但是并不是对象字面量。

// 导出的内容可以通过 as 重命名
export {name as mingzi,age,gender};