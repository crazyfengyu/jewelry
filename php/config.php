<?php 
    //公用数据库连接
    @header("content-type:text/html:charset=utf-8");
    @header("Access-Control-Allow-Origin:*");
    //创建数据库连接
    $conn = @mysql_connect("192.168.50.165","root","root");
    //指定访问的表
    mysql_select_db("crazy",$conn);
    //指定编码格式
    mysql_query("set names utf8");
?>