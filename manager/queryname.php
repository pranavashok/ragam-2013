<?php
require_once("initdb.php");

$queryParam = $mysqli->real_escape_string($_POST['q']);

$query1=$mysqli->query("SELECT name, ragID, college FROM participants WHERE name LIKE '%$queryParam%'");

$list = array();
while($participant=$query1->fetch_assoc())
	$list[] = $participant;

echo json_encode($list);
?>