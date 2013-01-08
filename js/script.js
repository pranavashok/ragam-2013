function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
}
$(document).ready(function(){
			
			initialize();
			$("#mainlinks a").click(function(){
				$("#mainmenu-pane").rotate({angle: -25, animateTo:0, callback: function(){
					$("#mainmenu-pane").animate({right:'100%'});
				}});
				$("#font-pane").animate({left:'100%'}, 'slow');
			});
		});
