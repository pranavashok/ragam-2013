function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', 'easeInOutQuad', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', 'easeInOutQuad', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	$("#submenu-pane").css({top:'30%', left:'-40%'});
	$("#submenu-pane").rotate({angle:-15});
	$("#content-pane").css({top:'-100%', left:'-70%'});
	$("#content-pane").rotate({angle:-15});
	$("#home-button").hide();
}
$(document).ready(function(){
	var w = $(window).width();
	var h = $(window).height();
	initialize();
	
	$("#mainlinks li").click(function(){
		$("#font-pane").css({left: w*0.3+'px'});
		$("#font-pane").stop().animate({left:'100%', top:'-160%'}, 1000, 'easeInOutQuad');
		$("#mainmenu-pane").stop().animate({right:'105%', top:'-70%'}, 1000, 'easeInOutQuad');
		$("#followlinks").animate({opacity:'0'});
		$("#home-button").show();
	});

	$("#sublinks li a").click(function(){
		$("#submenu-pane").css({top: h*0.35+'px'});
		$("#content-pane").stop().animate({left:'-30%', top:'-150%'}, 1000, 'easeInOutQuad', function(){
			$("#content-pane").rotate({angle:-13, animateTo:0});
		});
		$("#submenu-pane").stop().animate({top:'130%'}, 1000, 'easeInOutQuad');
	});

	$("#home-button").click(function(){
		/* Code to reset level zero */
		$(this).hide();
		$("#mainmenu-pane").animate({right:'70%', top:'-100%'},'slow', 'easeInOutQuad');
		$("#font-pane").animate({left:'30%', top:'-100%'}, 'slow', 'easeInOutQuad', function(){ 	
			/* Code to reset level one */
			$("#submenu-pane").css({top:'30%', left:'-40%'});
			$("#submenu-pane").rotate({angle:-15});
			$("#content-pane").css({top:'-100%', left:'-70%'});
			$("#content-pane").rotate({angle:-15});
			/* Code to reset level one */
		});
		$("#followlinks").animate({opacity:'1'});
		/* Code to reset level zero */
	});
});
