function panduanLogin(){
    $.get("/users/pddl")
    .then(res1=>{
        if(res1.err){
            $("#right-news").html(`
            <a id="login" href="">登录</a>
            <span>&nbsp;|&nbsp;</span>
            <a id="regist" href="" >立即注册</a>`)
        }else{
            if(res1.data.touxiang){
                $("#right-news").html(`
                <div class="img-box" id="img-box2">
                    <img src="/avatars/${res1.data.touxiang}" alt="">
                    <p>${res1.data.username}</p>
                </div>
                <div id="right-news-display" class="update-img1">
                    <div class="img-box bottom-underline">
                        <div id="bgc-img">
                            <span id="update-img" class="update-img1">修改</span>
                        </div>
                        <p>${res1.data.username}</p>
                    </div>
                    <div id="box2">
                        <p>消息</p>
                        <p class="exit">退出</p>
                    </div>
                </div>
                `)
                $("#bgc-img").addClass("bgc-img1")
                $(".bgc-img1").css("background-image",`url(/avatars/${res1.data.touxiang})`)
            }else{
                $("#right-news").html(`
                <div class="img-box" id="img-box2">
                    <img src="/avatars/1.jpg" alt="">
                    <p>${res1.data.username}</p>
                </div>
                <div id="right-news-display" class="update-img1">
                    <div class="img-box bottom-underline">
                        <div id="bgc-img">
                            <span id="update-img" class="update-img1">修改</span>
                        </div>
                        <p>${res1.data.username}</p>
                    </div>
                    <div id="box2">
                        <p>消息</p>
                        <p class="exit">退出</p>
                    </div>
                </div>
                `)
                $("#bgc-img").addClass("bgc-img1")
                $(".bgc-img1").css("background-image",`url(/avatars/1.jpg)`)
            }
            
            $("#bgc-img").on("mouseenter",function(){
                $("#update-img").removeClass("update-img1")
            })
            $("#bgc-img").on("mouseleave",function(){
                $("#update-img").addClass("update-img1")
            })

            $("#img-box2").on("mouseenter",function(){
                $("#right-news-display").removeClass("update-img1")
            })
            $("#img-box2").on("mouseleave",function(){
                $("#right-news-display").addClass("update-img1")
            })

            $("#right-news-display").on("mouseenter",function(){
                $("#right-news-display").removeClass("update-img1")
            })
            $("#right-news-display").on("mouseleave",function(){
                $("#right-news-display").addClass("update-img1")
            })
        }
    });
};

// 登录弹出函数
function loginTanchu(){
    login = layer.open({
        title: "登录",
        type: 1,
        area: ['600px', '300px'],
        content: `<form id="login-form">
            <table id="tab-login">
                <tr>
                    <td>用户名：</td>
                    <td><input type="text" id="name" name="name" required></td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td><input type="password" name="psw" id="psw" required></td>
                </tr>
                <tr>
                    <td colspan="2"><button id="login-btn">登录</button></td>
                </tr>
            </table>
        </form>
        `
    })
}

// 首页板块函数
function mainHtml(){
            
    let mainHtmlStr = `
    <div class="main-box-box" >
        <img src="/images/a.png" alt="">
        <div>
            <p class="main-box-box-p1" index="1">灌水专区</p>
            <p>贴数:0</p>
            <p>占位</p>
        </div>
    </div>
    <div class="main-box-box">
        <img src="/images/b.png" alt="">
        <div>
            <p class="main-box-box-p1" index="2">学术交流</p>
            <p>贴数:0</p>
            <p>占位</p>
        </div>
    </div>
    <div class="main-box-box">
        <img src="/images/c.png" alt="">
        <div>
            <p class="main-box-box-p1" index="3">web前端</p>
            <p>贴数:0</p>
            <p>占位</p>
        </div>
    </div>
    <div id="main-box-box-four"  class="main-box-box">
        <img src="/images/d.png" alt="">
        <div>
            <p class="main-box-box-p1" index="4">UI设计</p>
            <p>贴数:0</p>
            <p>占位</p>
        </div>
    </div>`;

$("#main-box").html(mainHtmlStr)
$("#main-box2").html("")
}

 // 显示登录的函数
 function xianshiLogin(){
    $.get("/users/pddl")
    .then(res=>{
        if(res.err){
            $("#dlpd").removeClass("dlpd2")
            editor.$textElem.attr('contenteditable', false)
            $("#blogTitle").prop("disabled",true)
        }else{
            $("#dlpd").addClass("dlpd2")
            editor.$textElem.attr('contenteditable', true)
            $("#blogTitle").prop("disabled",false)
            
        }
        
    })
}

// 查找博客并渲染
function findBlogs(data){
    $.get("/blog/findBlog",{bankuai:data})
        .then(data2=>{
            // data表示点击的哪个版块
            // console.log(data);
            // 博客的数据
            // console.log(data2);
            
            $("#main-box2").html("")
            $.get("./templates/btXiangQing.ejs")
            .then(data3=>{
            // 请求的模板
            // console.log(data3);
            
            let htmlStr = ejs.render(data3,{data2,data})
            $("#main-box").html("")
            $("#main-box2").html(htmlStr)
            }) 
            xianshiLogin();
    })
}

