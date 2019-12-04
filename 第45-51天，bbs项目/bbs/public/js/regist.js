
$("#logo").on("click",function(){
    mainHtml();
})

// 注册弹出框
$("body").delegate("#regist","click",(e)=>{
    e.preventDefault();
    regist = layer.open({
        title: "立即注册",
        type: 1,
        area: ['600px', '400px'],
        content: `<form id="regist-form">
            <table id="tab-regist">
                <tr>
                    <td>用户名：</td>
                    <td><input type="text" id="username" name="name" required></td>
                    <td id="user"></td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td><input type="password" name="psw" id="psw1" required></td>
                    <td id="psw3"></td>

                </tr>
                <tr>
                    <td>确认密码：</td>
                    <td><input type="password" id="psw2" required></td>
                    <td id="psw4"></td>
                </tr>
                <tr>
                    <td>邮箱：</td>
                    <td><input name="email" id="email1"  type="email" required></td>
                    <td id="email2"></td>
                </tr>
                <tr>
                    <td>验证码：</td>
                    <td><input type="text" name="cap" id="cap"></td>
                    <td id="cap2"></td>
                </tr>
                <tr>
                    <td class="td-last"></td>
                    <td><img id="captcha" src="/captcha">
                    <span id="change">换一张</span></td>
                </tr>
                <tr>
                    <td class="td-last"></td>
                    <td><button id="regist-btn">注册</button></td>
                </tr>
            </table>
            
        </form>
        `
    })
})
// 验证码
$("body").delegate("#change","click",()=>{
    let c = Math.random();
    $("#captcha").attr("src","/captcha?"+c);
});
let timer;
// 判断用户名
$("body").delegate("#username","input",()=>{
    if(timer){
        clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
        $.get("/users/finduser",{username:$("#username").val()})
        .then(res=>{
            if(res.err){
                $("#user").text("此用户已被注册").addClass("yibeizhuce").removeClass("keyishiyong")
            }else{
                $("#user").text("√").addClass("keyishiyong").removeClass("yibeizhuce")
            }
        })
    }, 1500);
});
// 密码判断
$("body").delegate("#psw2","input",()=>{
    if($("#psw1").val()!=$("#psw2").val()){
        $("#psw3").text("×").addClass("cuowu")
        $("#psw4").text("×").addClass("cuowu")
    }else{
        $("#psw3").text("√").addClass("keyishiyong").removeClass("cuowu")
        $("#psw4").text("√").addClass("keyishiyong").removeClass("cuowu")
    }
})
$("body").delegate("#psw1","input",()=>{
    if($("#psw1").val()!=$("#psw2").val()){
        $("#psw3").text("×").addClass("cuowu")
        $("#psw4").text("×").addClass("cuowu")
    }else{
        $("#psw3").text("√").addClass("keyishiyong").removeClass("cuowu")
        $("#psw4").text("√").addClass("keyishiyong").removeClass("cuowu")
    }
})
// 邮箱判断
$("body").delegate("#email1","input",()=>{
    var qqq = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
    if(qqq.test($("#email1").val())){
        $("#email2").text("√").addClass("keyishiyong")
    }
})


// 验证码判断
$("body").delegate("#cap","input",()=>{
    $.get("/users/findcap",{cap:$("#cap").val()})
    .then(res=>{
        if(res.err){
            $("#cap2").text("验证码不正确").addClass("yibeizhuce")
        }else{
            $("#cap2").text("√").addClass("keyishiyong")
        }
    });
});


// 注册按钮
$("body").delegate("#regist-btn","click",(e)=>{
    e.preventDefault();
    if($("#email2").text()=="√"&&$("#psw4").text()=="√"&&$("#psw3").text()=="√"&&$("#user").text()=="√"){
        var obj = $("#regist-form").serialize();
        $.post("/users/regist",obj)
        .then(res=>{
            if(res.err){
                layer.alert("邮件发送失败，请重新注册");
            }else{
                layer.close(regist);
                layer.alert("注册成功");
            }
        })
    }else{
        layer.alert("请判断您输入的内容是否全部正确")
    }
});