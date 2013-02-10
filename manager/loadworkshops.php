<?php
require_once("initdb.php");

$query0=$mysqli->query("SELECT * from events where cat_id = '2'");
$i=0;

while($eve=$query0->fetch_assoc()) {
	$data['name']=$eve['name'];
	$data['content']=$eve['longdesc'];

	$data['shortdesc']=$eve['shortdesc'];
    $i++;
}
echo json_encode($data);
?>
