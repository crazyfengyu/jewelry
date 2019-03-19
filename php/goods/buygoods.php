<?php 
    //引入公共的config
    @require_once("../config.php");

    //获取传入的数据
    $userid = $_GET["userid"];
    $goodsid = $_GET["goodsid"];
    $goodssize = $_GET["goodssize"];
    $goodsstyle = $_GET["goodsstyle"];

    //创建SQL语句
    $sql = "insert into usergoods (userid,goodsid,num,goodssize,goodsstyle) values ($userid,$goodsid,1,'$goodssize','$goodsstyle')";

    //执行sql语句
    mysql_query($sql);

    //获取上条sql语句受影响的行数
    $count = mysql_affected_rows();

    //判断是否添加成功
    $obj = array();
    if($count>0){
        $obj["code"]=1;
        $obj["msg"] ="添加成功";
    }else{
        $obj["code"] =0;
        $obj["msg"] ="网络繁忙，请稍后再试!";
    }

    echo json_encode($obj);
?>