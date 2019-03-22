<?php
    //引入公共的配置文件
    @require_once("../config.php");

    //获取传入的参数
    $userid = $_GET["userid"];
    $userpwd = $_GET["userpwd"];

    //创建sql语句
    $sql = "update userinfo set userpwd = '$userpwd' where id = $userid";


    //执行sql语句
    mysql_query($sql);

    //获取上条sql语句受影响的行数
    $count = mysql_affected_rows();

    //判断是否插入成功
    $obj = array();

    if($count>0){
        //插入成功
        $obj["code"] = 1;
        $obj["msg"] = "修改成功";
    }else{
        //插入失败
        $obj["code"] = 0;
        $obj["msg"] = "网络繁忙，请稍后重试！";
    }

    echo json_encode($obj);

?>