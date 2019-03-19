<?php 
    //引入公共的config配置文件
    @require_once("../config.php");

    //接受传入的参数
    $id = $_GET["id"];

    //创建sql语句
    $sql = "select * from goodsinfo where id = $id";

    //执行sql语句
    $result = mysql_query($sql);

    //获取数据
    $item = mysql_fetch_array($result,MYSQL_ASSOC);

    $obj = array();

    //判断数据是否找到
    if($item){
        $obj[] = $item;
    }else{
        //没有找到数据
        $obj["code"] = 0;
        $obj["msg"] = "您访问的数据不存在？";
    }

    echo json_encode($obj);
?>