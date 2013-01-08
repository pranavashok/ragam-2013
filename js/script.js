function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	$("#submenu-pane").rotate({angle:-15});
	$("#contents-pane").rotate({angle:-15});
}
$(document).ready(function(){
			initialize();
			$("#mainlinks a").click(function(){
				$("#font-pane").animate({left:'100%'}, '2000');
				$("#mainmenu-pane").animate({right:'98%'}, '2000', function() { $("#mainmenu-pane").rotate({angle: -25, animateTo:0})});
			});
		});
