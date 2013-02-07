
<?php $subDir = "/magar/"?>
<html>
<head>
	<link href="<?php echo $subDir; ?>css/reset.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/style.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/logo.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/animations.css" rel="stylesheet"/>
	<link href="<?php echo $subDir; ?>css/nanoscroller.css" rel="stylesheet" > 
	<link href="<?php echo $subDir; ?>css/favicon.ico" rel="icon" type="image/x-icon" />
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.jquery.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/prefixfree.dynamic-dom.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jQueryRotate.2.2.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.history.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/script.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.nanoscroller.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/jquery.address-1.4.min.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor-tween.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/arbor-graphics.js"></script>
	<script type="text/javascript" src="<?php echo $subDir; ?>js/shortcut.js"></script>
</head>
<body>
	
	<div id="light"></div>
	<ul class="spinner">
	    <li></li>
	    <li></li>
	    <li></li>
	</ul>
	<div id="dark"></div>

	<div id="login-form-wrapper">
		<input class="emailentry" type="email" name="email" title="email" placeholder="email" onblur="inputBlur(this)" />
		<input class="passwordentry" type="password" name="password" title="password" placeholder="password" onblur="inputBlur(this)" />
		<div id="tip">press enter to log in...</div>
	</div>
	<div id="signup-form-wrapper">
		<input class="nameentry" type="text" name="fullname" title="Full Name" placeholder="full name" onblur="inputBlur(this)" />
		<input class="emailentry" type="email" name="email" title="Email" placeholder="email" onblur="inputBlur(this)" />
		<input class="passwordentry" type="password" name="password" title="Password" placeholder="password" onblur="inputBlur(this)" />
		<input class="collegeentry" type="text" name="college" title="College" placeholder="college" />
		<input class="phoneentry" type="text" name="phone" title="Phone" placeholder="phone" />

		<div id="tip">press enter to register...</div>
	</div>
	<div  id="shortcut" >
		<canvas id="sitemap"></canvas>
	</div>
<div id="wrapper">
	<div class="active-links">
		<div id="session">
			<a id="login-link" href="#">
				<img src="<?php echo $subDir; ?>img/login.png" />
			</a>
			<a id="signin-link" href="#">
				<img src="<?php echo $subDir; ?>img/signup.png" />
			</a>
		</div>
		<div id="signin-dropdown">
		</div>
	</div>
	<section class="pane" id="font-pane">
		<div id="logo">
			<!--<canvas id="letterr"  width="1050" height="500" ></canvas>
				<canvas id="lettera"  width="1050" height="500" ></canvas>
				<canvas id="letterg"  width="1050" height="500" ></canvas>
				<canvas id="lettera2"  width="1050" height="500" ></canvas>
				<canvas id="letterm"  width="1050" height="500" ></canvas>
				<script type="text/javascript" src="<?php echo $subDir; ?>js/logo.js"></script>
			-->
			<img src="<?php echo $subDir; ?>img/font.png" />
		</div>
	</section>

	<section class="pane" id="mainmenu-pane">
		<nav id="mainlinks">
			<ul>
				<a href="Events"><li id="mainlink1" title="Events">events</li></a>
				<a href="Proshows"><li id="mainlink2" title="Proshows">proshows</li></a>
				<a href="Workshops"><li id="mainlink3" title="Workshops">workshops</li></a>
				<a href="Showcase"><li id="mainlink4" title="Showcase">showcase</li></a>
				<a href="Sponsors"><li id="mainlink5" title="Sponsors">sponsors</li></a>
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
	 <div id="footer_inner">
	
		<div id="supportpane_top">
			<div id="ticker">
				<div>The registrations will be open from 16th Feb 2013</div>
	    		<div>The last date for submission of entries for the photography contest is 20th Feb 2013</div>
    			<div>Shankar Mahadevan has confirmed to perform at Ragam 2013</div>
			</div>
			<span id="social_panel">
				<!--<a style="width:48px; height:48px; display:inline; opacity:0"><img src="<?php echo $subDir; ?>img/twitter.png"></a>
				<!--<a href="facebook.com" target="blank" ><img src="<?php echo $subDir; ?>img/twitter.png"></a>-->
				<span class="social_button"><a href="youtube.com" target="blank"><img src="<?php echo $subDir; ?>img/youtube.png"></a></span>
				<span class="social_button"><a href="www.facebook.com/Ragam.nitc" target="blank"><img src="<?php echo $subDir; ?>img/facebook.png"></a></span>
			</span>
		</div>
	
		<div id="supportpane_bot">
			<div id="menu_tab">
				<span class="menu_item menu_click">contacts</span>
				<span class="menu_item menu_nonclick">schedule</span>
				<span class="menu_item menu_click">information</span>
				<span class="menu_item menu_nonclick">gallery</span>
				<span class="menu_item menu_nonclick">brochure</span>
				<span class="menu_item menu_click">reach us</span>
			</div>
			<div id="menu_info">
			
			<!-- the php will come here -->
			
			</div>
			<div id="menu_bot">
				<div id="nitc_details">
					<div id="nitc_logo"></div>
					<div id="nitc_addr" style="color:white;">
							<b>	NIT Calicut<br/> 
							NIT Campus P. O.<br/> 
							Calicut - 673601<br/></b> 
							<a style="color:white;" target="_blank" href="http://www.nitc.ac.in">www.nitc.ac.in</a>	
					</div>
				</div>			
			</div>
		</div>	
	
	 </div>

</div>

<div id="home-button">
	<img src="<?php echo $subDir; ?>img/back.png">
</div>
	
	<input id="searchBox" type="text" name="search" size="40">
<div id="hidden-box">
	<div id="hidden-submenu-links">
	</div>
	<div id="hidden-subsubmenu-links">
	</div>
	<div id="hidden-art">
		
	</div>
</div>
</body>
</html>
