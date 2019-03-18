<?php 
    //引入公共的文件
    @require_once("../config.php");

    //获取传入的参数
    $userid = $_GET["userid"];

    //创建sql语句
    $sql = "select * from userinfo where id = $userid";

    //执行sql语句
    $result = mysql_query($sql);

    //获取结果
    $item = mysql_fetch_array($result,MYSQL_ASSOC);

    $item["userpwd"] = "";

    echo json_encode($item);
?>