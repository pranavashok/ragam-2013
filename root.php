<?php 
  if (getenv('SUBDIR')) {
    $hksubdir = getenv('SUBDIR');
  }
  else {
    $hksubdir = $_SERVER['SUBDIR'];
  }
  if ($hksubdir == "")
  {
    $subDir = "/";
  }
  else
  {
    $subDir = "/".$hksubdir."/";
  }
?>
<script>
    var subDir = '<?php echo $subDir; ?>';
</script>
