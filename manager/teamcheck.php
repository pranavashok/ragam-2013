<?php
require_once("initdb.php");

$ragamid = $mysqli->real_escape_string($_POST['ragamid']);
$event_id = $mysqli->real_escape_string($_POST['event']);
$success=0;
$msg="";
$sub="";
$q1 = $mysqli->query("SELECT `eventinfo`.`event_id`, `eventinfo`.`event_name` FROM `eventinfo` WHERE `event_id` LIKE '".$event_id."%';");

while($r1 = $q1->fetch_assoc())
	$evt[$r1['event_id']]=$r1['event_name'];
if(count($evt)>1){
	$success=3;
	$sub='<form id="sub-events">';
	foreach ($evt as $k => $v)
		$sub.='<input type="radio" name="sub_event_id" value="'.$k.'">'.$v.'</input><br />';

	$sub.="</form>";
}else{
//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
	$query = $mysqli->query("SELECT `team`.`team_id` AS team_id FROM `team` WHERE `team`.`teammember_id`='$ragamid' AND `team`.`event_id`='$event_id'");
	if($query) {
		$row = $query->fetch_assoc();
		if($row!=NULL) {
			$success = 1;
			$msg = "You have already registered for this event and your Team ID is $event_id$row[team_id]";
		}else
			$success = 0;
	}
}
$result['success'] = $success;
$result['msg'] = $msg;
$result['sub'] = $sub;
echo json_encode($result);
?>