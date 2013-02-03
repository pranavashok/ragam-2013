<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("login", $con);

$sql="INSERT INTO details (name, email, password, ph_no)
VALUES
('$_POST[name]','$_POST[email]','$_POST[pwd]','$_POST[ph_no]')" ;

if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "Registration Successful";

mysql_close($con);
?>