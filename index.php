<?php $subDir = "/magar/"?>
<html>
<head>
	<link href="<?php echo $subDir; ?>css/reset.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/style.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/logo.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/animations.css" rel="stylesheet"/>
	<link rel="stylesheet" href="<?php echo $subDir; ?>css/nanoscroller.css"> 
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.jquery.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.dynamic-dom.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jQueryRotate.2.2.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.history.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/script.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/signin1.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.nanoscroller.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.address-1.4.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor-tween.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor-graphics.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/shortcut.js"></script>
</head>
<body>
	<div  id="shortcut" >
		<canvas id="sitemap"></canvas>
	</div>
	<div class="pane" id="login-pane">
		<div id="loginform">
			<form name="input" action="logindetails.php" method="get">
				First name: <input type="text" name="firstname"><br>
				Last name: <input type="text" name="lastname"><br>
				Password: <input type="password" name="pwd"><br>
				Re-enter password: <input type="password" name="pwd">
				<input type="radio" name="sex" value="male">Male
				<input type="radio" name="sex" value="female">Female<br>
				<input type="submit" value="Submit">
			</div>


		</form> 


		<button id="logcancel" >Cancel</button> <!--<input type="button" value="Cancel" id="logcancel" /> -->  
	</div>
</div>
	 <div id="top-stuff">  
		<div id="topnav">
			<div class="active-links">
				<div id="session">
					<a id="signin-link" href="#">
						<strong>Sign in</strong>
					</a>
				</div>
				<div id="signin-dropdown">
				</div>
			</div>
		</div>
	</div>
<div id="wrapper">
	<section class="pane" id="font-pane">
		<div id="logo">
			<canvas id="letterr"  width="1050" height="500" ></canvas>
			<canvas id="lettera"  width="1050" height="500" ></canvas>
			<canvas id="letterg"  width="1050" height="500" ></canvas>
			<canvas id="lettera2"  width="1050" height="500" ></canvas>
			<canvas id="letterm"  width="1050" height="500" ></canvas>
			<script type="text/javascript" src="<?php echo $subDir; ?>js/logo.js"></script>

		</div>
	</section>

	<section class="pane" id="mainmenu-pane">
		<nav id="mainlinks">
			<ul>
				<a href="Events"><li id="mainlink1" title="Events">events</li></a>
				<a href="Proshows"><li id="mainlink2" title="Proshows">proshows</li></a>
				<a href="Workshops"><li id="mainlink3" title="Workshops">workshops</li></a>
				<a href="Showcase"><li id="mainlink4" title="Showcase">showcase</li></a>
				<a href="Informals"><li id="mainlink5" title="Informals">informals</li></a>
			</ul>
		</nav>
	</section>
	<section class="pane" id="inner-pane">
		<div id="content-half">
			<div id="subsubmenu">
				<ul id="subsubmenu-links">
				</ul>
			</div>
			<div id="content-container">
				<div id="content-wrapper">
					<div id="content-heading">
					</div>
					<div id="content-content-wrapper" class="nano">
						<div id="content-content" class="content">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="submenu-half">
			<div id="submenu">
				<ul id="submenu-links">
				</ul>
			</div>
			<div id="painting">
			</div>
		</div>
	</section>
	
</div>
<div class="pane" id="support-pane">
	<div id="arrow-up"></div>
</div>
<div id="home-button">
	<img src="<?php echo $subDir; ?>img/home.png">
</div>
<aside id="followlinks">
	<a style="width:48px; height:48px; display:inline; opacity:0"><img src="<?php echo $subDir; ?>img/twitter.png"></a>
	<a href="facebook.com" target="blank" ><img src="<?php echo $subDir; ?>img/twitter.png"></a>
	<a href="youtube.com" target="blank"><img src="<?php echo $subDir; ?>img/youtube.png"></a>	
	<a href="twitter.com" target="blank"><img src="<?php echo $subDir; ?>img/facebook.png"></a>				
</aside>
<input id="searchBox" type="text" name="search" size="40">
</body>
</html>
