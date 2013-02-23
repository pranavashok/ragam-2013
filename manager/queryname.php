<?php
require_once("initdb.php");

$queryParam = $mysqli->real_escape_string($_GET['q']);

$query1=$mysqli->query("SELECT name, ragID, college FROM participants WHERE name LIKE '%$queryParam%' AND active=1");

$list = array();
while($participant=$query1->fetch_assoc())
	$list[] = $participant;

echo json_encode($list);
?>