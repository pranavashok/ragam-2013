<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Get Details</title>
  <meta name="viewport" content = "width = device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no" />
  
  <link href="css/footable-0.1.css" rel="stylesheet" type="text/css" />
  <link href="css/footable.sortable-0.1.css" rel="stylesheet" type="text/css" />
  
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js" type="text/javascript"></script>
  <script src="js/footable-0.1.js" type="text/javascript"></script>
  <script src="js/footable.sortable.js" type="text/javascript"></script>
  <script src="js/footable.filter.js" type="text/javascript"></script>
  <script type="text/javascript">
    $(function() {
      $('table').footable();
    });
  </script>
</head>
<body>
<?php
require_once("initdb.php");

if(isset($_GET['e'])) {
	$event_id = $mysqli->real_escape_string($_GET['e']);
	$query = $mysqli->query("SELECT team_id, teamleader_id, teammember_id, college FROM team, participants WHERE team.teamleader_id = participants.ragID AND event_id = '$event_id';");
	if($query) {
		$list = array();
		while($l = $query->fetch_assoc()) {
			$list[] = $l;
		}
		echo 'Filter:<input id="filter" type="text" /><br />';
		echo "<table class='footable'>";
		echo '
		<thead>
        <tr>
          <th data-sort-initial="true">
            Team ID
          </th>
          <th>
            Teamleader ID
          </th>
          <th>
            Teammember ID
          </th>
          <th>
            College
          </th>
        </tr>
      	</thead>';
		$j = 0;
		foreach($list as $a) {
		    echo "<tr>";
		    $i = 0;
	        foreach($a as $v) {
	        	if($i==0) {
	        		echo "<td>$event_id$v</td>";
	        	}
	        	else if($i==1) {
	        		echo "<td>RAG$v</td>";
	        	}
	        	else if($i==2)
	        		echo "<td><a href='getdetails.php?id=$v'>RAG$v</a></td>";	
	        	else
	        		echo "<td>$v</td>";
	        	$i++;
	        }
	    	echo "</tr>";
	    	$j++;
		}
		echo "</table>";
		echo "Total participants: $j";
	}
	else {
		//Couldn't run query	
	}
}
else if(isset($_GET['id'])) {
	$ragam_id = $mysqli->real_escape_string($_GET['id']);
	$query = $mysqli->query("SELECT `ragID`, `name`, `email`, `college`, `phone`, `accommodation`, `timestamp` FROM `participants` WHERE `ragID` = $ragam_id;");
	if($query) {
		$p = $query->fetch_assoc();
		echo "<table class='footable'>";
		echo "<thead><th data-sort-initial='true'>ID</th><th>Name</th><th>E-Mail</th><th>College</th><th>Phone</th><th>Accommodation</th><th>Timestamp</th></thead>";
		echo "<tr>";
		foreach($p as $v) {
	        echo "<td>$v</td>";
	    }
	    echo "</tr></table>";
	}
	else {

	}

}
else if(isset($_GET['participants'])) {
	$participants = $mysqli->real_escape_string($_GET['participants']);
	if($participants=='all') {
		$query = $mysqli->query("SELECT `ragID`, `name`, `email`, `college`, `phone` FROM `participants` WHERE `active` = 1");
		if($query) {
			$list = array();
			while($l = $query->fetch_assoc()) {
				$list[] = $l;
			}
			echo "<h3>All Active Participants</h3><br />";
			echo 'Filter:<input id="filter" type="text" /><br />';
			echo "<table class='footable'>";
			echo "<thead><th data-sort-initial='true'>ID</th><th>Name</th><th>E-Mail</th><th>College</th><th>Phone</th></thead>";
			$j = 0;
			foreach($list as $a) {
			    echo "<tr>";
			    $i = 0;
		        foreach($a as $v) {
		        	if($i==0)
		        		echo "<td><a href='getdetails.php?id=$v'>RAG$v</a></td>";	
		        	else
		        		echo "<td>$v</td>";
		        	$i++;
		        }
		    	echo "</tr>";
		    	$j++;
			}
			echo "</table>";
			echo "Total participants: $j";
		}
		else {
			//Couldn't run query	
		}
	}
	else if($participants=='nonnit') {
		$query = $mysqli->query("SELECT `ragID`, `name`, `email`, `college`, `phone` FROM `participants` WHERE `college` NOT LIKE 'NIT, Calicut' AND `active` = 1");
		if($query) {
			$list = array();
			while($l = $query->fetch_assoc()) {
				$list[] = $l;
			}
			echo "<h3>NON-NIT Participants</h3><br />";
			echo 'Filter:<input id="filter" type="text" /><br />';
			echo "<table class='footable'>";
			echo "<thead><th>ID</th><th>Name</th><th>E-Mail</th><th>College</th><th>Phone</th></thead>";
			$j = 0;
			foreach($list as $a) {
			    echo "<tr>";
			    $i = 0;
		        foreach($a as $v) {
		        	if($i==0)
		        		echo "<td><a href='getdetails.php?id=$v'>RAG$v</a></td>";	
		        	else
		        		echo "<td>$v</td>";
		        	$i++;
		        }
		    	echo "</tr>";
		    	$j++;
			}
			echo "</table>";
			echo "Total participants: $j";
		}
		else {
			//Couldn't run query	
		}
	}
	else if($participants=='collegewise') {
		$query = $mysqli->query("SELECT `college`, count(*) FROM `participants` WHERE `college` NOT LIKE 'NIT, Calicut' AND  `active` = 1 GROUP BY college ORDER BY `participants`.`college` ASC");
		if($query) {
			$list = array();
			while($l = $query->fetch_assoc()) {
				$list[] = $l;
			}
			echo "<h3>College-wise Participants</h3><br />";
			echo 'Filter:<input id="filter" type="text" /><br />';
			echo "<table class='footable'>";
			echo "<thead><th>College</th><th>Participants</th></thead>";
			$j = 0;
			foreach($list as $a) {
			    echo "<tr>";
			    $i = 0;
		        foreach($a as $v) {
		        	if($i==0)
		        		echo "<td><a href='getdetails.php?participants=".urlencode($v)."'>$v</a></td>";	
		        	else
		        		echo "<td>$v</td>";
		        	$i++;
		        }
		    	echo "</tr>";
		    	$j++;
			}
			echo "</table>";
			echo "Total participants: $j";
		}
		else {
			//Couldn't run query	
		}
	}
	else {
		$query = $mysqli->query("SELECT `ragID`, `name`, `email`, `college`, `phone` FROM `participants` WHERE `college` LIKE '$participants' AND `active` = 1");
		if($query) {
			$list = array();
			while($l = $query->fetch_assoc()) {
				$list[] = $l;
			}
			echo "<h3>Participants from $participants</h3><br />";
			echo 'Filter:<input id="filter" type="text" /><br />';
			echo "<table class='footable'>";
			echo "<thead><th>ID</th><th>Name</th><th>E-Mail</th><th>College</th><th>Phone</th></thead>";
			$j = 0;
			foreach($list as $a) {
			    echo "<tr>";
			    $i = 0;
		        foreach($a as $v) {
		        	if($i==0)
		        		echo "<td><a href='getdetails.php?id=$v'>RAG$v</a></td>";	
		        	else
		        		echo "<td>$v</td>";
		        	$i++;
		        }
		    	echo "</tr>";
		    	$j++;
			}
			echo "</table>";
			echo "Total participants: $j";
		}
		else {
			//Couldn't run query	
		}		
	}
}
else if(isset($_GET['events'])) {
	//Returns list of Event Name, Team ID and Teamleader ID of $ragamid
	$query = $mysqli->query("SELECT a.event_id, a.event_name, count(*) FROM (SELECT `team`.`event_id`,  `eventinfo`.`event_name` , COUNT( * ) FROM  `team` ,  `eventinfo` WHERE  `team`.`event_id` =  `eventinfo`.`event_id` GROUP BY `event_id`, `team_id`) a GROUP BY a.event_id");
	if($query) {
		$list = array();
		while($l = $query->fetch_assoc()) {
			$list[] = $l;
		}
		echo "<h3>Event Registration</h3><br />";
		echo 'Filter:<input id="filter" type="text" /><br />';
		echo "<table class='footable'>";
		echo "<thead><th>Event ID</th><th>Event Name</th><th>Teams</th></thead>";
		$j = 0;
		foreach($list as $a) {
		    echo "<tr>";
		    $i = 0;
	        foreach($a as $v) {
	        	if($i==0)
	        		echo "<td><a href='getdetails.php?e=$v'>$v</a></td>";	
	        	else
	        		echo "<td>$v</td>";
	        	if($i==2)
	        		$j+=$v;
	        	$i++;
	        }
	    	echo "</tr>";
		}
		echo "</table>";
		echo "Total registered teams: $j";
	}
	else {
		//Couldn't run query	
	}
}
?>