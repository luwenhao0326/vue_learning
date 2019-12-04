// 正则表达式搜索


var str = "asfbaabcsdlbaabcsdghabcabagdasabc";

// 正则表达式后添加 g 表示进行全局搜索，
// 添加 i 表示忽略大小写
var reg = /abc/g;


var res;
while(res = reg.exec(str)){
    console.log(res);
}
