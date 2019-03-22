/**
 * Created by 21213 on 2019/3/21.
 */
    //引入公共的头部和底部
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});
$(".common_footer").load("../common/footer.html");

//点击提交注册校准信息是否合法，写入数据库
$("#register").click(function () {
    //获取所有的数据
    var username = $("#username").val();
    var userlovename = $("#userlovename").val();
    var usertel = $("#usertel").val();
    var useremail = $("#email").val();
    var userpwd1 = $("#userpwd1").val();
    var userpwd2 = $("#userpwd2").val();
    //创建判断用户名的正则表达式
    var usernameReg = /^[a-z0-9\u2E80-\u9FFF]{2,16}$/ig;
    //创建判断用户爱人的姓名的正则表达式
    var userlovenameReg = /^[a-z0-9\u2E80-\u9FFF]{2,16}$/ig;
    //创建判断手机号的正则表达式
    var usertelReg = /^1(3|4|5|7|8)\d{9}$/ig;
    //创建判断邮箱的正则表达式
    var useremailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ig;
    //创建用户密码的正则表达式
    var userpwdReg = /^[a-z0-9._]{6,12}$/ig;


    //判断是否同意用户条款
    if ($("#agree:checked").length > 0) {
        //选中,进行用户输入的内容判断
        //判断用户名是否符合要求
        if (usernameReg.test(username)) {
            //符合进行下一级判断,判断用户爱人的姓名
            if (userlovenameReg.test(userlovename)) {
                //爱人用户名正确,校准手机号
                registerTip($("#username"), "#000");
                if (usertelReg.test(usertel)) {
                    //手机号格式正确,判断邮箱
                    registerTip($("#userlovename"), "#000");
                    if (useremailReg.test(useremail)) {
                        //邮箱格式正确,判断密码
                        registerTip($("#usertel"), "#000");
                        //两次密码是否一致
                        if (userpwd1 == userpwd2) {
                            //密码相同进行判断
                            registerTip($("#email"), "#000");
                            $("#userpwd2").attr("type", "password");
                            if (userpwdReg.test(userpwd1)) {
                                //密码格式正确完成注册，信息写入数据库
                                insertUser(username, userlovename, usertel, useremail, userpwd1);
                            } else {
                                //密码格式错误
                                registerTip($("#userpwd1"), "red");
                                registerTip($("#userpwd2"), "red");
                                registerShow();
                            }
                        } else {
                            //提示用户两次密码不一致
                            $("#userpwd2").attr("type", "text");
                            registerTip($("#userpwd2"), "red");
                            $("#userpwd2").val("两次密码不一致");
                            registerShow();
                        }

                    } else {
                        //邮箱格式错误
                        registerTip($("#email"), "red");
                        registerShow();
                    }

                } else {
                    //手机号格式错误
                    registerTip($("#usertel"), "red");
                    registerShow();
                }

            } else {
                //用户爱人姓名错误
                registerTip($("#userlovename"), "red");
                registerShow();
            }
        } else {
            //不符合提示用户，显示字为红色
            registerTip($("#username"), "red");
            registerShow();
        }

    } else {
        //未选中,文字颜色变为红色
        registerTip($(".register_agree label"), "red");
    }
});

//勾选以后颜色恢复正常
$("#agree").click(function () {
    if ($("#agree:checked").length > 0) {
        registerTip($(".register_agree label"), "#bdaab2")
    }
});

//封装函数显示错误信息
function registerTip(obj, value) {
    obj.css("color", value);
}

//封装函数提示用户
function registerShow() {
    $(".register_tip").show();
}

//写入数据库函数
function insertUser(username, userlovename, usertel, useremail, userpwd) {
    //调用ajax
    $.ajax({
        type: "get",
        url: "../../php/login/register.php",
        data: {
            username: username,
            userlovename: userlovename,
            usertel: usertel,
            useremail: useremail,
            userpwd: userpwd
        },
        dataType: "json",
        success: function (obj) {
            skip(obj);
        }
    });
}

//提示用户注册是否成功,注册成功跳转至登录界面
function skip(obj) {
    if (obj["code"] == 1) {
        window.location.href = "./login.html";
    } else {
        setCookie("backUrl", window.location.href, 7);
        setCookie("tip", obj["msg"], 7);
        window.location.href = "./retry.html";
    }
}
