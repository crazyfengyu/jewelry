/**
 * Created by 21213 on 2019/3/21.
 */

//导航图注册事件
var index = 0;

var timeId = bannerShow(index);

$("#index_banner_nav li").mouseenter(function () {
    clearInterval(timeId);
    index = $(this).index();
    $(this).addClass("selected").siblings().removeClass("selected");
    $("#index_banner_content li").eq(index).addClass("selected").siblings().removeClass("selected");
}).mouseleave(function () {
    timeId = bannerShow(index);
});

$(".index_banner").mouseenter(function () {
    clearInterval(timeId);
    $(".index_banner_left").stop(true, false).show();
    $(".index_banner_right").stop(true, false).show();
}).mouseleave(function () {
    $(".index_banner_left").stop(true, false).hide();
    $(".index_banner_right").stop(true, false).hide();
    timeId = bannerShow(index);
});

$(".index_banner_left").click(function () {
    clearInterval(timeId);
    $("#index_banner_nav li").each(function () {
        if ($(this).hasClass("selected")) {
            $("#index_banner_nav li").each(function () {
                $(this).removeClass("selected");
            });
            $("#index_banner_content li").each(function () {
                $(this).removeClass("selected");
            });
            var abc = $(this).index();
            abc = abc - 1;
            if (index < 0) {
                abc = $("#index_banner_nav li").length - 1;
            }
            $("#index_banner_nav li").eq(abc).addClass("selected");
            $("#index_banner_content li").eq(abc).addClass("selected");
            return false;
        }
    });
});

$(".index_banner_right").click(function () {
    clearInterval(timeId);
    $("#index_banner_nav li").each(function () {
        if ($(this).hasClass("selected")) {
            $("#index_banner_nav li").each(function () {
                $(this).removeClass("selected");
            });
            $("#index_banner_content li").each(function () {
                $(this).removeClass("selected");
            });
            var abc = $(this).index();
            abc = abc + 1;
            if (abc > $("#index_banner_nav li").length - 1) {
                abc = 0;
            }
            console.log(abc);
            $("#index_banner_nav li").eq(abc).addClass("selected");
            $("#index_banner_content li").eq(abc).addClass("selected");
            return false;
        }
    });
});
function bannerShow(index) {
    clearInterval(timeId);
    timeId = setInterval(function () {
        index++;
        if (index >= ($("#index_banner_nav li").length)) {
            index = 0;
        }
        if (index < 0) {
            index = $("#index_banner_nav li").length - 1;
        }
        $("#index_banner_nav li").eq(index).addClass("selected").siblings().removeClass("selected");
        $("#index_banner_content li").eq(index).addClass("selected").siblings().removeClass("selected");
    }, 1500);
    return timeId;
}

//点击登录，跳转到登录界面
$(document).on("click", "#header_username_login", function () {
    setCookie("backUrl", window.location.href, 7);
    window.location.href = "./html/login/login.html";
});

//点击注册，跳转到注册界面
$(document).on("click", "#header_username_register", function () {
    setCookie("backUrl", window.location.href, 7);
    window.location.href = "./html/login/register.html";
});

//登录成功到达这个页面显示用户名
if (getCookie("userid")) {
    $.ajax({
        type: "get",
        url: "./php/index/selectuser.php",
        data: {
            userid: getCookie("userid")
        },
        dataType: "json",
        success: function (obj) {
            showUser(obj);
        }
    });
}

//封装函数显示用户信息
function showUser(obj) {
    $(".header_one").html("<a href='./html/login/information.html'>" + obj["username"] + "</a><a href='#' class='exit'> /注销 </a>")
}

//为注销按钮绑定事件
$(document).on("click", ".exit", function () {
    setCookie("backUrl", "", -7);
    setCookie("userid", "", -7);
    window.location.reload();
});
