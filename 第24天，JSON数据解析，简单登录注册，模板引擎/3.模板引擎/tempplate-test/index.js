var express = require("express");

var app = express();

app.use(express.static("www"));

// 导入并配置模板引擎。模板引擎可以将模板和数据渲染为一个页面。
var art = require("express-art-template");
app.engine("html",art);



var books = [
    {name:"三国演义",price:25,sellout:true},
    {name:"水浒传",price:30,sellout:false},
    {name:"西游记",price:19.9,sellout:false}
];


// 静态文件夹中的html页面内容是固定的，这些页面称为静态页面。
// 如果某个url地址的页面是根据服务器的数据动态生成的页面,则是动态页面

// 可以采用字符串拼接的方式生成动态页面,但是有更高效的方法:模板引擎。
app.get("/books",function(req,res){
    var html = "";
    html+="<table>";
    for(var i =0;i<books.length;i++){
        var b = books[i];
        html+="<tr>";
        html+="<td>"+b.name+"</td>";
        html+="<td>"+b.price+"元</td>";
        html+="<td>"+(b.sellout?"售罄":"有货")+"</td>";
        html+="</tr>";
    }
    html+="</table>";

    res.send(html);
});


app.get("/bookpage",function(req,res){
 
    // 在设置了模板引擎之后，res可以使用render方法，使用数据渲染一个页面，第一个参数表示使用的模板(只需要写模板名，模板文件默认存储在根目录的views文件夹中),第二个参数表示要渲染的数据(必须是对象，不能是数组)。
    // 页面渲染完毕之后发送给前端
    res.render("books.html",{books:books});

});

app.listen(8080,function(){
    console.log("服务器已开启");
    
});