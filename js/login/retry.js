/**
 * Created by 21213 on 2019/3/21.
 */
    //引入公共的头部和底部
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});
$(".common_footer").load("../common/footer.html");

//判断cookie中是否有提示信息
if (getCookie("tip")) {
    $("#show_tip").html(getCookie("tip"));
}

//点击返回按钮，跳转回之前的页面
$("#retry_back").click(function () {
    setCookie("tip", "", -7);
    window.location.href = getCookie("backUrl");
});