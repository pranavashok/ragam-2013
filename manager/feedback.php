<?php
require_once("initdb.php");

$name=$mysqli->real_escape_string($_POST['name']);
$email=$mysqli->real_escape_string($_POST['email']);
$feedback=$mysqli->real_escape_string($_POST['feedback']);

$query0=$mysqli->query("INSERT INTO feedback (name, email, feedback) VALUES ('$name', '$email', '$feedback');");
if($query0 === TRUE)
	echo "1";
else
	echo "0";
?>