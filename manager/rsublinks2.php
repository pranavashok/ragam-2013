<?php
require_once("initdb.php");
require_once("../root.php");
//$par_cat=$_POST['cat'];
//if($par_cat == "Events")
	//$par_cat_id=1;
//else if($par_cat == "Proshows")
	//$par_cat_id=2;	
$query1=$mysqli->query("SELECT name,cat_id,par_cat FROM event_cats");
while($event_cats=$query1->fetch_assoc())
{
	if($event_cats['par_cat']==-1)	
		$nodes[$event_cats["name"]]=array("color"=>"blue", "shape"=>"dot", "alpha"=>1);
	else 	
		$nodes[$event_cats["name"]]=array("color"=>"black", "alpha"=>0);
}
$nodes["Ragam"]=array("color"=>"red","shape"=>"dot", "alpha"=>1);


$query2=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat=-1");
while($event_cats2=$query2->fetch_assoc())
{
	//$event_cats["name"]=array();
	$edges["Ragam"][$event_cats2["name"]]=array('length'=>.8);;
	$query3=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat='$event_cats2[cat_id]'");
	while($event_cats3=$query3->fetch_assoc())
		{
			$edges[$event_cats2["name"]][$event_cats3["name"]]=array();
			$last=$event_cats3["name"];
			$last = str_replace(' ', '_', $last);
			$query4=$mysqli->query("SELECT name FROM events WHERE cat_id='$event_cats3[cat_id]'");
			$k=$query4->fetch_assoc();
			$last2=$k["name"];
			$last2=str_replace(' ', '_', $last2);
			$nodes[$event_cats3["name"]]["link"]=$subDir.$event_cats2["name"]."/".$last."/".$last2;
		}

}
$query4=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat=-1");
while($event_cats4=$query4->fetch_assoc())
{
	$main[]=$event_cats4["name"];
}
$mains[]="Ragam";
$data["nodes"]=$nodes;
$data["edges"]=$edges;
echo json_encode($data);
//while
//$i=0;
//$links_level1="";
//$links_level2=array();
//$desc_level2=array();
//	$query2=$mysqli->query("SELECT name FROM event_cats WHERE par_cat_id=-'$event_cat[cat_id];
//while($cat=$query1->fetch_assoc())
//{
//$query2=$mysqli->query("SELECT name,shortdesc,code FROM events WHERE cat_id='$cat[cat_id]'");

	
	//while($cat2=$query2->fetch_assoc())
//		$cat['sublinks'][]=$cat2;
	//$links[]=$cat;
   // $i++;


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
	//print_r ($main);
//print json_encode($main);
?>
