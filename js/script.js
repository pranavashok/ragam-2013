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
		$("#content-pane").addClass('rotate');
		$("#submenu-pane").addClass('rotate');
	});

	$("#home-button").click(function(){
		/* Code to reset level zero */
		$(this).hide();
		$("#font-pane").removeClass("moveout");
		$("#mainmenu-pane").removeClass("moveout");
		/* Code to reset level one */
		$("#submenu-pane").removeClass("rotate");

		$("#content-pane").removeClass("rotate");
		/* Code to reset level one */
		$("#followlinks").animate({opacity:'1'});
		/* Code to reset level zero */
	});
});
