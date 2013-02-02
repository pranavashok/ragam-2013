<?php
require_once("initdb.php");

$event = $_POST['event'];

$event = preg_replace('/([a-z])([A-Z])/', '$1 $2', $event);
$query1=$mysqli->query("SELECT name,longdesc FROM events WHERE name='$event'");

$eve = $query1->fetch_assoc();

echo json_encode($eve);
?>
