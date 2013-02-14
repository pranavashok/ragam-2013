<?php
require_once("initdb.php");

$name=mysql_real_escape_string($_POST['name']);
$email=mysql_real_escape_string($_POST['email']);
$feedback=mysql_real_escape_string($_POST['feedback']);

echo $name.$email.$feedback;

$query0=$mysqli->query("INSERT INTO feedback (name, email, feedback) VALUES ('$name', '$email', '$feedback');");
if($query0 === TRUE)
	echo "1";
else
	echo "0";
?>