/**
 * Created by 21213 on 2019/3/21.
 */
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");

$.ajax({
    type: "get",
    url: "../../php/goods/getusershoppingcar.php",
    data: {
        type: 3,
        userid: getCookie("userid")
    },
    dataType: "json",
    success: function (obj) {
        showGoods(obj);
    }
});

function showGoods(obj) {
    $(".xq").html("");
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        $("<ul><li class='second_li'><img src='../../images/goods/" + item["goodsimg"] + ".png' alt='' class='goodsimg fl'/><p class='fl'>" + item["goodsname"] + "</p></li><li class='three_li'><p>" + item["goodsprice"] * item["num"] + ".00</p></li><li class='four_li'><span>" + item["num"] + "</span></li><li class='five_li'><p>待付款</p></li><li class='six_li'><p><a href='../goods/topay.html?price=" + item["goodsprice"] * item["num"] + "'>去付款</a><button class='cancle_dd' data_id=" + item["id"] + ">取消订单</button></p></li></ul>").appendTo($(".xq"));
    }
}


$(".user_select li.selected").index();
$(".user_select li").click(function () {
    $(".user_select li").each(function () {
        $(this).removeClass("selected");
    });
    $(this).addClass("selected");
    tbshow();
});

function tbshow() {
    var index = $(".user_select li.selected").index();
    $(".series>li").each(function () {
        $(this).removeClass("selected");
    });
    $(".series>li").eq(index).addClass("selected");

}


$(".user_select_exit").click(function () {
    setCookie("backUrl", "", -7);
    setCookie("userid", "", -7);
    window.location.href = "./login.html";
});


$("#replace").click(function () {
    var userpwdReg = /^[a-z0-9._]{6,12}$/ig;

    if ($("#newuserpwd1").val() == $("#newuserpwd2").val()) {
        if (userpwdReg.test($("#newuserpwd1").val())) {
            $.ajax({
                type: "get",
                url: "../../php/login/updateuser.php",
                data: {
                    userid: getCookie("userid"),
                    userpwd: $("#newuserpwd1").val()
                },
                dataType: "json",
                success: function (obj) {
                    if (obj["code"] == 1) {
                        $(".g").hide();
                        $(".t").show();
                    } else {
                        setCookie("backUrl", window.location.href, 7);
                        window.location.href = "./retry.html";
                    }
                }
            });
        } else {
            $("#newuserpwd1").css("color", "red");
        }
    } else {
        $("#newuserpwd1").css("color", "red");
    }
});

$(document).on("click", ".cancle_dd", function () {
    $.ajax({
        type: "get",
        url: "../../php/pay/updateusergoodstype.php",
        data: {
            type: 0,
            id: $(this).attr("data_id")
        },
        dataType: "json",
        success: function (obj) {
            if (obj["code"] == 1) {
                window.location.reload();
            }
        }
    });
});