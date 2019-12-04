mainHtml();
let bankuai = null;
$("body").delegate(".main-box-box-p1","click",function(e){
    // let str = e.target.attributes[1].nodeValue;
    let str = $(this).attr("index");
    $.post("/blog/bankuai",{str})
    .then(res=>{
        bankuai = res.bankuai;
        findBlogs(bankuai)
    })
})

$("body").delegate("#send-btn","click",()=>{
    let obj = {};                        
    obj.title = $("#blogTitle").val();
    obj.content = $("#div4").html();
    obj.bankuai = bankuai;
    $.post("/blog/send-blog",obj)
    .then(data=>{
        findBlogs(bankuai)
    })
    
})




let yuanTieId = null;

// 点击帖子详情
$("body").delegate(".tiezixiangqing","click",function(e){
    $("#main-box2").html("")
    let str = $(this).attr("index");
    // let str = e.target.attributes[1].nodeValue;
    $.get("/blog/xiangqing",{str})
    .then(xiangqing=>{
        // console.log(xiangqing);
        // 使用变量记住原帖子的id，用来回帖的时候使用
        yuanTieId = str;
        
        $.get("./templates/tzXiangQing.ejs")
        .then(data=>{
            let htmlStr = ejs.render(data,xiangqing)
            $("#main-box").html("")
            $("#main-box2").html(htmlStr)
            xianshiLogin();
        })
    })
})

// 回帖的接口
$("body").delegate("#send-blog","click",()=>{
    let obj = {};                      
    obj.content = $("#div4").html();
    obj.yuanTieId = yuanTieId;
    // console.log(obj);
    $.post("/blog/huifu-blog",obj)
    .then(data=>{
        find();
    });
});

// 回帖的回帖
$("body").delegate(".hfdhf-btn","click",function(e){
    e.preventDefault();
    let w = $(this).attr("index");
    let q = $(`.${w}`).val();
    $.get("/users/pddl")
    .then(res=>{
        if(res.err){
            layer.msg("请先登录")
        }else{
            $.get("/blog/hfdhf",{content:q,blog_id:w})
            .then(res=>{
                console.log(res);
                find();
            })
    
        }
    })
    
})

// 回帖成功之后再次查询
function find(){
    $.get("/blog/xiangqing",{str:yuanTieId})
    .then(xiangqing=>{
    // console.log(xiangqing);
    // 使用变量记住原帖子的id，用来回帖的时候使用
        $.get("./templates/tzXiangQing.ejs")
        .then(data2=>{
            console.log(xiangqing);
            
            let htmlStr = ejs.render(data2,xiangqing)
            $("#main-box").html("")
            $("#main-box2").html(htmlStr)
            xianshiLogin();
        });
    });
}


// 发帖字数限制
$("body").delegate("#blogTitle","input",function(){
    if($(this).val().length>=80){
        $(this).val($(this).val().substr(0,80));
    }
    let last = 80 - $(this).val().length;
    $("#blogTitle-span").text(`还能输入${last}个字`);
});
// 下方发言前登陆
$("body").delegate("#dlpd-p","click",(e)=>{
    
    e.preventDefault();
    loginTanchu();
})