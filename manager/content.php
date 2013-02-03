<?php
require_once("initdb.php");

$event = $_POST['event'];

$event = preg_replace('/([a-z])([A-Z])/', '$1 $2', $event);
$query1=$mysqli->query("SELECT name,longdesc,contacts FROM events WHERE name='$event'");

$eve = $query1->fetch_assoc();
$data['name']=$eve['name'];
$data['content']=$eve['longdesc']."<br/><br/><strong>Contacts</strong><br/><br/>".$eve['contacts'];
$data['content']=preg_replace("/\|\|sec\|\|/","<br/><br/><strong>",$data['content']);
$data['content']=preg_replace("/\|\|ttl\|\|/","</strong><br/><br/>",$data['content']);

$data['content']=preg_replace("/\|\|@\|\|/","<br/>",$data['content']);
$data['content']=preg_replace("/\|\|0\|\|/","@tathva.org<br/><br/>",$data['content']);

echo json_encode($data);
?>
