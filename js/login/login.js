/**
 * Created by 21213 on 2019/3/21.
 */
    //引入公共的头部和底部
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});
$(".common_footer").load("../common/footer.html");

//点击登录判断用户名和密码是否正确
$("#login").click(function () {
    //获取用户名和密码
    var username = $("#username").val();
    var userpwd = $("#userpwd").val();
    //调用ajax判断数据
    $.ajax({
        type: "get",
        url: "../../php/login/login.php",
        data: {
            username: username,
            userpwd: userpwd
        },
        dataType: "json",
        success: function (obj) {
            successTip(obj);
        }
    });
});

//封装函数，判断是否登录成功
function successTip(obj) {
    if (obj["code"] == 1) {
        setCookie("userid", obj["userid"], 7);
        if (getCookie("backUrl")=="") {
            window.location.href = "../../index.html";
        } else {
            window.location.href = getCookie("backUrl");
        }
    } else {
        setCookie("tip", obj["msg"], 7);
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "./retry.html";
    }
}