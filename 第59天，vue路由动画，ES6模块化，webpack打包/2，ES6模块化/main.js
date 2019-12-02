
// 使用es6模块化，使用import xxx from "xxx"  导入一个模块。
// 导入之后的名字可以和原模块中内容的名字不同
// 这种导入方式只能用于通过export default导出的内容。
import make from "./a.js";

let s = make();

console.log(s);


// 对于导出了多个内容的文件，可以选择性导入
// 在{}写要导入的内容，名字必须一致。
import {mingzi,age} from "./b.js";

console.log(mingzi);
console.log(age);





