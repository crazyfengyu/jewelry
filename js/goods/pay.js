/**
 * Created by 21213 on 2019/3/21.
 */
$(".common_header").load("../common/header.html", function () {
    $.getScript("../../js/common/header.js");
});

$(".common_footer").load("../common/footer.html");


//构建省市联动 //数据获取地址：http://api.yytianqi.com/citylist/id/3
//调用ajax获取数据

$.ajax({
    type: "get",
    url: "http://api.yytianqi.com/citylist/id/2",
    dataType: "json",
    success: function (obj) {
        //获取国家的id和name
        var countryName = obj["name"];
        var countryId = obj["city_id"];
        //创建国家列表
        $("<option value=" + countryId + ">" + countryName + "</option>").appendTo($("#country"));
        $("#country").change(function () {
            $("#provice").html("<option value=''>请选择省份</option>");
            $("#city").html("<option value=''>请选择城市</option>");
            $("#town").html("<option value=''>请选择区县</option>");
            if ($(this).val() != "") {
                //获取省份列表
                proviceList = obj["list"];
                //循环创建省份
                for (var i = 0; i < proviceList.length; i++) {
                    var item = proviceList[i];
                    $("<option value=" + item["city_id"] + ">" + item["name"] + "</option>").appendTo($("#provice"));
                }
            }

            $("#provice").change(function () {
                $("#city").html("<option value=''>请选择城市</option>");
                $("#town").html("<option value=''>请选择区县</option>");
                //获取省份的id
                var proviceId = $(this).val();
                //获取省份
                var provice = proviceList.filter(function (item) {
                    return item["city_id"] == proviceId;
                })[0];
                //获取城市的集合
                cityList = provice["list"];
                //循环创建元素
                for (var i = 0; i < cityList.length; i++) {
                    var item = cityList[i];
                    $("<option value=" + item["city_id"] + ">" + item["name"] + "</option>").appendTo($("#city"));
                }


                $("#city").change(function () {

                    $("#town").html("<option value=''>请选择区县</option>");
                    //获取城市id
                    var cityId = $(this).val();
                    //获取城市
                    var city = cityList.filter(function (item) {
                        return item["city_id"] == cityId;
                    })[0];
                    //获取区县的集合
                    if (city["list"] != undefined) {
                        var townList = city["list"];
                        for (var i = 0; i < townList.length; i++) {
                            var item = townList[i];
                            $("<option value=" + item["city_id"] + ">" + item["name"] + "</option>").appendTo($("#town"));
                        }
                    }


                });
            });
        });
    }
});


//点击提交按钮保存收货地址
$("#submit_address").click(function () {
    //获取地址
    var address = $("#country").find("option:selected").text() + $("#provice").find("option:selected").text() + "省" + $("#city").find("option:selected").text() + "市" + ($("#town").val() == "" ? "" : $("#town").find("option:selected").text()) + "(区，县，镇)" + $("#address_xmsg").val();
    //调用ajax写入数据
    $.ajax({
        type: "get",
        url: "../../php/pay/addaddress.php",
        data: {
            userid: getCookie("userid"),
            username: $("#address_name").val(),
            userphone: $("#address_phone").val(),
            useraddress: address,
            userzipcode: $("#address_yb").val(),
            usertel: $("#address_tel").val()
        },
        dataType: "json",
        success: function (obj) {
            successAdd(obj)
        }
    });
});

function successAdd(obj) {
    if (obj["code"] == 0) {
        setCookie("backUrl", window.location.href, 7);
        window.location.href = "../login/retry.html";
    } else {
        //调用ajax修改商品信息
        window.location.href = "./balance.html";
        //$.ajax({
        //    type: "get",
        //    url: "../../php/pay/updateusergoods.php",
        //    data: {
        //        userid: getCookie("userid"),
        //        type: 2
        //    },
        //    dataType: "json",
        //    success: function (obj) {
        //        if (obj["code"] == 1) {
        //            window.location.href = "./balance.html";
        //        } else {
        //            setCookie("backUrl", window.location.href, 7);
        //            window.location.href = "../login/retry.html";
        //        }
        //    }
        //});
    }
}

//调用ajax获取存储地址
$.ajax({
    type: "get",
    url: "../../php/pay/selectaddress.php",
    data: {
        userid: getCookie("userid")
    },
    dataType: "json",
    success: function (obj) {
        //显示地址
        showExitsAddress(obj);
    }
});

function showExitsAddress(obj) {
    if (obj) {
        var country = obj["useraddress"].substring(0, obj["useraddress"].indexOf("国") + 1);
        var provice = obj["useraddress"].substring(obj["useraddress"].indexOf("国") + 1, obj["useraddress"].indexOf("省") + 1);
        var city = obj["useraddress"].substring(obj["useraddress"].indexOf("省") + 1, obj["useraddress"].indexOf("市") + 1);
        var town = obj["useraddress"].substring(obj["useraddress"].indexOf("市") + 1, obj["useraddress"].indexOf("镇)") + 2);
        var xx = obj["useraddress"].substring(obj["useraddress"].indexOf("镇)") + 2, obj["useraddress"].length);
        $("#address_name").val(obj["username"]);
        $("#address_phone").val(obj["userphone"]);
        $("#address_yb").val(obj["userzipcode"]);
        $("#address_tel").val(obj["usertel"]);
        $("#country option").html(country);
        $("#provice option").html(provice);
        $("#city option").html(city);
        $("#town option").html(town);
        $("#address_xmsg").val(xx);
    }
}

