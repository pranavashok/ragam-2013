function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', 'easeInOutQuad', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', 'easeInOutQuad', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	//$("#submenu-pane").rotate({angle:-15});
	//$("#content-pane").rotate({angle:-15});
	$("#home-button").hide();
}
$(document).ready(function(){
	var w = $(window).width();
	var h = $(window).height();
	initialize();
	
	$("#mainlinks li").click(function(){
		$("#font-pane").addClass("moveout");
		$("#mainmenu-pane").addClass("moveout");
		$("#followlinks").animate({opacity:'0'});
		$("#home-button").show();
	});

	$("#sublinks li a").click(function(){
		$("#submenu-pane").addClass('rotate');
		//$("#content-pane").css({top: -h+'px', left: -w*0.7+'px'});
		//$("#content-pane").stop().animate({left:'-30%', top:'-150%'}, 1000, 'easeInOutQuad', function(){
		//	$("#content-pane").rotate({angle:-13, animateTo:0});
		//});
		$("#content-pane").addClass('rotate');
		//$("#submenu-pane").stop().animate({top:'130%'}, 3000, 'easeInOutQuad');
	});

	$("#home-button").click(function(){
		/* Code to reset level zero */
		$(this).hide();
		$("#font-pane").removeClass("moveout");
		$("#mainmenu-pane").removeClass("moveout");
		/* Code to reset level one */
		$("#submenu-pane").removeClass("movedown");
		$("#submenu-pane").removeClass("rotate");

		$("#content-pane").removeClass("rotate");
		/* Code to reset level one */
		$("#followlinks").animate({opacity:'1'});
		/* Code to reset level zero */
	});
});
