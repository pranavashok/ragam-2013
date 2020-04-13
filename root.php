<?php 
  $hksubdir = getenv('SUBDIR');
  if ($hksubdir == "")
  {
	  $subdir = "";
	  $subDir = "/";
  }
  else
  {
	  $subdir = $hksubdir;
	  $subDir = "/".$subdir."/";
  }
?>
<script>
	var subDir = '<?php echo $subdir; ?>';
</script>
