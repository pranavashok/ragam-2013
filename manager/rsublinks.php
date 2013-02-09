<?php
require_once("initdb.php");

$par_name=$_POST['cat'];
$query0=$mysqli->query("SELECT cat_id FROM event_cats WHERE name='$par_name'");
$par_cat_id=$query0->fetch_assoc();
$par_cat=$par_cat_id['cat_id'];
$query1=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat='$par_cat'");

$i=0;

while($cat=$query1->fetch_assoc()) {
	$query2=$mysqli->query("SELECT name,shortdesc,code FROM events WHERE cat_id='$cat[cat_id]'");
	while($cat2=$query2->fetch_assoc())
		$cat['sublinks'][]=$cat2;
	$links[]=$cat;
    $i++;

}
echo json_encode($links);
?>
