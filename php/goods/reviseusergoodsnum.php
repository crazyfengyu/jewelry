<?php 
    //调用公共的config.php
    @require_once("../config.php");

    //获取传入的购物车id
    $carId = $_GET["carId"];
    $num = $_GET["num"];

    //创建sql语句
    $sql = "update usergoods set num = num+$num where id = $carId";

    //执行sql语句
    mysql_query($sql);

    //查看上一条sql语句受影响的行数
    $count = mysql_affected_rows();

    //判断是否修改成功
    $obj = array();

    if($count>0){
        $obj["code"] =1;
        $obj["msg"] = "增加成功";
    }else{
        $obj["code"] = 0;
        $obj["msg"] = "网络繁忙，请稍后再试";
    }

    echo json_encode($obj);
?>