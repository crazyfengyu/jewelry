function getTodayMonthDays(date) {
    var tempDate = new Date("2000-1-1");
    tempDate.setFullYear(date.getFullYear());
    tempDate.setMonth(date.getMonth() + 1);
    tempDate.setDate(0);
    return tempDate.getDate();
}

function getTodayMonthOneDaysWeek(date) {
    var tempDate = new Date("2000-1-1");
    tempDate.setFullYear(date.getFullYear());
    tempDate.setMonth(date.getMonth());
    return tempDate.getDay() == 0 ? 7 : tempDate.getDay();
}


function setCookie(key, keyValue, days) {
    //获取当前时间
    var date = new Date();
    //设置cookie过期时间
    date.setDate(date.getDate() + days);
    //将数据写入cookie
    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(keyValue) + ";expires=" + date + ";path=/";
}

function getCookie(key) {
    //获取cookie
    var cookieStr = document.cookie;
    //判断cookie里面是否有值
    if (cookieStr) {
        //根据"；"拆分cookie字符串
        var cookieList = cookieStr.split("; ");
        //循环遍历
        for (var i = 0; i < cookieList.length; i++) {
            //去除每个数组的值
            var item = cookieList[i];
            var itemList = item.split("=");
            if (decodeURIComponent(itemList[0]) == key) {
                //获取名称值
                var itemKey = decodeURIComponent(itemList[0]);
                //获取名称对应的值
                var itemValue = decodeURIComponent(itemList[1]);
                return itemValue;
            }
        }
        return "";
    } else {
        return "";
    }
}
