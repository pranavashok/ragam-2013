<?php
require_once("initdb.php");

$par_name=$_POST['cat'];
$query0=$mysqli->query("SELECT cat_id FROM event_cats WHERE name='$par_name'");
$par_cat_id=$query0->fetch_assoc();
$par_cat=$par_cat_id['cat_id'];
$query1=$mysqli->query("SELECT name, cat_id FROM event_cats WHERE par_cat='$par_cat'");
//$query1=$mysqli->query("SELECT name, cat_id FROM event_cats WHERE par_cat='$par_cat'");
$l = array();
while($row = $query1->fetch_assoc()) {
	$query2=$mysqli->query("SELECT name,shortdesc,code,cat_id FROM events WHERE cat_id='$row[cat_id]'");
	while($x = $query2->fetch_assoc())
		 	$row['sublinks'][]=$x;
	$l[] = $row;
}
$query3=$mysqli->query("SELECT name,shortdesc,code,cat_id FROM events WHERE cat_id='$par_cat'");
while($y = $query3->fetch_assoc())
		 	$l[]=$y;
echo json_encode($l);
?>