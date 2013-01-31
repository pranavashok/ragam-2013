<?php
require_once("initdb.php");
$par_cat=$_GET['cat'];
if($par_cat == "Events")
	$par_cat_id=1;
else if($par_cat == "Proshows")
	$par_cat_id=2;	
$query1=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat='$par_cat_id'");

$i=0;
//$links_level1="";
//$links_level2=array();
//$desc_level2=array();
while($cat=$query1->fetch_assoc())
{


	$query2=$mysqli->query("SELECT name,shortdesc,code FROM events WHERE cat_id='$cat[cat_id]'");
	while($cat2=$query2->fetch_assoc())
		$cat['sublinks'][]=$cat2;
	$links[]=$cat;
    $i++;

}
	//$cat['sublinks'] = Array();
	//while($cat['sublinks']=$query2->fetch_assoc());
	//{

	//}

	
	//$links_level1=$links_level1."<li>".$cat['name']."</li>";
/*    	$catid=$cat['cat_id'];
	$query2=$mysqli->query("SELECT name,shortdesc,code FROM events WHERE cat_id='$catid'");
	$event=$query2->fetch_assoc();
	array_push($links_level2,"");
	array_push($desc_level2,"");
	i=0;
	do
	{
		$ecode=$event['code'];
		$links_level2[i]=$links_level2[i]."<a href='#!".str_replace(" ","_",$event['name'])."'>".$event['name']."</a>";
		$desc_level2[i]=$desc_level2[i].
		    <?php echo $event['shortdesc']; ?>
		    </div></a>
	} while($event=$query2->fetch_assoc());*/
 
	//$links_level1="<ul>".$links_level1."</ul>";
	print json_encode($links);
?>
