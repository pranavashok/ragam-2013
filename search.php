<p id="searchresults">
<?php
   $count =0;
   // PHP5 Implementation - uses MySQLi.
   // mysqli('localhost', 'yourUsername', 'yourPassword', 'yourDatabase');
   require_once("manager/config.php");
   $db = mysql_connect($host, $db_user, $db_password);
   mysql_select_db($db_name, $db);
   if(!$db) {
      // Show error if we cannot connect.
      echo 'ERROR: Could not connect to the database.';
   } else {
      // Is there a posted query string?
      if(isset($_GET['q'])) {
         $queryString = mysql_real_escape_string($_GET['q']);

         // Is the string length greater than 0?
         if(strlen($queryString) >0) {
            $query = mysql_query("SELECT name, shortdesc, longdesc, tags FROM events WHERE name LIKE '%".$queryString."%' UNION SELECT name, shortdesc, longdesc, tags FROM events WHERE tags LIKE '%".$queryString."%' UNION 
SELECT name, shortdesc, longdesc, tags FROM events WHERE longdesc LIKE '% ".$queryString." %' OR longdesc LIKE '% ".$queryString.".%' ORDER BY `name` DESC LIMIT 8");
	    //echo mysql_num_rows($query);
	    if(mysql_num_rows($query) < 4){
	    	$query = mysql_query("SELECT name, shortdesc, longdesc, tags FROM events WHERE name LIKE '%".$queryString."%' UNION SELECT name, shortdesc, longdesc, tags FROM events WHERE tags LIKE '%".$queryString."%' UNION 
SELECT name, shortdesc, longdesc, tags FROM events WHERE longdesc LIKE '%".$queryString."%' ORDER BY `name` DESC LIMIT 8");
}
	    if(mysql_num_rows($query) == 0){
	    	echo '<span class="nomatch"> <br/>No matches found </span>';
	    }
            if($query) {
               // While there are results loop through them - fetching an Object.

               // Store the category id
               $category = "";
               while ($result = mysql_fetch_object($query)) {
                  if($result->name != $category) { // check if the category changed
                     echo '<span class="category">'.$result->name.'</span>';
                     $category = $result->name;
                  }
                     //echo '<a href="#!'.$result->article_hash.'">'; article hash should be created
                     //echo '<img src="styles/images/search_thumbs/'.$result->article_hash.'.jpg" alt="" />';  article hash probs
                     
                     $title = $result->name;
                     if(strlen($title) > 35) { 
                        $title = substr($title, 0, 35) . "...";
                     }                     
                     echo '<span class="searchheading">'.$title.'</span>';
                     
                     $description = strip_tags($result->longdesc);
                     $pos = strpos($description, $queryString);
                     if(strlen($description) > 100) { 
                        $min = $pos-10;
                        if($min<0) $min=0;
                        else if($min+100 > strlen($description)) $min= $pos-100;
                        $description = substr($description, $min, 100);
                        $min = strpos($description, " ");
                        $max = strrpos($description, " ");
                        $description = substr($description, $min, $max-$min);
                        $description = preg_replace('/'.$queryString.'/', '<strong>'.$queryString.'</strong>', $description);
                     }
                     
                     echo '<span>'.$description.'...</span></a>';
                  }
                  echo '<span class="seperator"></span><br /><br />';
            } else {
               echo 'ERROR: There was a problem with the query.';
            }
         } else {
            // Dont do anything.
         } // There is a queryString.
      } else {
         echo 'There should be no direct access to this script!';
      }
   }
?>
</p>
