<?php
require_once("initdb.php");

$par_cat=$_GET['cat'];
if($par_cat == "Events")
	$par_cat_id=1;
else if($par_cat == "Proshows")
	$par_cat_id=2;	
$query1=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat='$par_cat_id'");

$i=0;

while($cat=$query1->fetch_assoc())
{


	$query2=$mysqli->query("SELECT name,shortdesc,code FROM events WHERE cat_id='$cat[cat_id]'");
	while($cat2=$query2->fetch_assoc())
		$cat['sublinks'][]=$cat2;
	$links[]=$cat;
    $i++;

}

	print json_encode($links);
?>
