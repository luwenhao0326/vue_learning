// 正则表达式 ：regular expression
// 用于字符串匹配判断，例如判断某个字符串是否为一个合法的手机号


// 在js中，正则表达式是一个对象，有两种创建方法：

// 第一种，通过构造函数创建。参数是正则表达式字符串。

var reg1 = new RegExp("\d");

// 第二种，通过字面量创建，直接使用//创建。把正则表达式字符串写在两个//中间。
var reg2 = /[a-z]/;

// ------------------------------------------------

// 判断字符串中是否包含abc
var reg3 = /abc/;
var str3 = "adsgbdbabc123";
// 正则表达式对象的test方法，用于判断某个字符串是否满足本正则表达式，参数是要验证的字符串，返回值是布尔值，满足返回true。
// console.log(reg3.test(str3));


// 判断字符串是否以abc开头
// ^ 匹配字符串开始位置
var reg4 = /^abc/;
var str4 = "abc15454";
// console.log(reg4.test(str4));

// 判断字符串是否是abc
// $ 匹配字符串结束位置
var reg5 = /^abc$/;

// 判断字符串的字符是否是0-9的数字
// \d 表示匹配一个数字
var reg6 = /^\d$/;
var str6 = "5";
// console.log(reg6.test(str6));

// 字符串是否包含数字
var reg7 = /\d/;

// 字符串中是否包含两个连续的数字
var reg8 = /\d\d/;

// 手机号正则表达式
var phoneReg1 = /^1\d\d\d\d\d\d\d\d\d\d$/;
var tel1 = "13103783657";
// console.log(phoneReg1.test(tel1));

// 判断字符串中的字符是否都是数字（至少一个，不能为空字符串）
//  + 表示前边的字符匹配一位或多位
var reg9 = /^\d+$/;
// console.log(reg9.test(""));

// * 表示匹配0位或多位
var reg10 = /^\d*$/;
// console.log(reg10.test(""));

//  ? 表示匹配0位或1位
var reg11 = /^\d?$/;
// console.log(reg11.test(""));

// {n} 表示匹配n位
var reg12 = /^\d{5}$/;
// console.log(reg12.test("22222"));

// {n,m} 表示匹配n到m位
var reg13 = /^\d{2,7}$/;
// console.log(reg13.test("12345678"));

// {n,}匹配至少n位
var reg14 = /^\d{5,}$/;
// console.log(reg14.test("12345"));

// 手机号2
var phoneReg2 = /^1\d{10}$/;

// 第一位必须是1.第二位只能是35678其中一个，后面9位数字
// []表示匹配区间，匹配某些字符中的任何一个。
var phoneReg3 = /^1[35678]\d{9}$/
// console.log(phoneReg3.test("13103783657"));

// [n-m] 表示匹配unicode编码表中n字符到m字符之间的所有的字符。
// [a-zA-Z]匹配所有英文字母
var reg15 = /^[a-zA-Z]$/;
// console.log(reg15.test("W"));


// 匹配中文字符
var reg16 = /^[\u4e00-\u9fa5]+$/;
console.log(reg16.test("我是张雪峰"));


//  \w 匹配数字字母下划线以及一些标点符号
// [a-zA-Z0-9_] 数字字母下划线

//  . 表示匹配除换行符以外的任意字符。（很少用）


//  如果需要表示正则表达式具有特殊语义的符号，例如+ [ ] {  } .  * ? 
// 则必须使用\进行转译
//  判断字符串中是否有三个连续的+
var reg17 = /\+{3}/;


// 判断字符串中是否包含\+

var reg18 = /\\\+/;

// ---------------------------------------------

