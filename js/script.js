function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', 'easeInOutQuad', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', 'easeInOutQuad', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	$("#submenu-pane").rotate({angle:-15});
	$("#contents-pane").rotate({angle:-15});
}
$(document).ready(function(){
			var w = $(window).width();
			initialize();
			$("#mainlinks a").click(function(){
				$("#font-pane").css({left: w*0.3+'px'});
				$("#font-pane").animate({left:'120%'}, 2000, 'easeOutQuart', function() {});
				$("#mainmenu-pane").animate({right:'100%'}, 1500, 'easeOutQuart', function() {});
				$("#mainmenu-pane").rotate({angle: -25, animateTo:0}, 1000, 'easeOutQuart');
			});
		});
