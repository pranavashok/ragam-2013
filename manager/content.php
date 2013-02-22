<?php
require_once("initdb.php");

$event = $_POST['event'];

$event = preg_replace('/_/', '$1 $2', $event);
$query1=$mysqli->query("SELECT name,code,longdesc,contacts,shortdesc FROM events WHERE name='$event'");

$eve = $query1->fetch_assoc();
$data['name']=$eve['name'];
$data['code']=$eve['code'];
$content = preg_replace("/<img[^>]+\>/i", "", $eve['longdesc']); 
$data['content']=$content."<br/><br/><strong>Contacts</strong><br/><br/>".$eve['contacts'];
$data['content']=preg_replace("/\|\|sec\|\|/","<br/><br/><strong>",$data['content']);
$data['content']=preg_replace("/\|\|ttl\|\|/","</strong><br/><br/>",$data['content']);

$data['content']=preg_replace("/(.+)\|\|0\|\|\|\|@\|\|(.+)/", "$1||0||",$data['content']);
$data['content']=preg_replace("/\|\|@\|\|/","<br/>",$data['content']);
$data['content']=preg_replace("/\|\|0\|\|/","@ragam.org.in <br/><br/>",$data['content']);
$data['content']=preg_replace('!<img.*?src=".+".*?/>!i', '', $data['content']);
$data['shortdesc']=$eve['shortdesc'];
echo json_encode($data);
?>
