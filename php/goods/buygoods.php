<?php 
    //引入公共的config
    @require_once("../config.php");

    //获取传入的数据
    $userid = $_GET["userid"];
    $goodsid = $_GET["goodsid"];
    $goodssize = $_GET["goodssize"];
    $goodsstyle = $_GET["goodsstyle"];

    //查看该用户是否买过这件商品
    $sql = "select * from usergoods where userid = $userid and goodsid = $goodsid and type = 1";

    //创建SQL语句


    //执行sql语句
    $result = mysql_query($sql);


    if(mysql_fetch_array($result)){
        $sql1 = "update usergoods set num = num+1 where userid = $userid and goodsid = $goodsid";
    }else{
        $sql1 = "insert into usergoods (userid,goodsid,num,goodssize,goodsstyle) values ($userid,$goodsid,1,'$goodssize','$goodsstyle')";
    }

    mysql_query($sql1);

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