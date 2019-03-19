<?php 
    //引入公共的config.php
    @require_once("../config.php");

    //获取传入的参数
    $userid = $_GET["userid"];

    //创建sql语句
    $sql = "SELECT gd.goodsname,gd.goodsimg,gd.goodsprice,us.goodsid,us.num,us.goodssize,us.goodsstyle from usergoods  us, goodsinfo  gd where us.goodsid = gd.id and us.userid = $userid";

    //执行sql语句
    $result = mysql_query($sql);

    //获取结果
    $obj = array();

    while($itme = mysql_fetch_array($result,MYSQL_ASSOC)){
        $obj[] = $itme;
    }

    echo json_encode($obj);
?>