$(document).ready(function(){
			$("#mainmenu-pane").animate({right:'70%'},'slow', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
			$("#font-pane").animate({left:'30%'}, 'slow', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});

		//	var trans = function(){
		//		$("#mainmenu-pane").animate({left: -1000px});
		//	}
			$("#mainlinks a").click(function(){
				//$("#font-pane").rotate'-25deg', x: '50%'}, 500, 'in-out');
				$("#mainmenu-pane").rotate({angle: -25, animateTo:0, callback: function(){
					$("#mainmenu-pane").animate({right:'100%'});
					$("#font-pane").animate({left:'100%'}, 'slow');
				}});
//				$("#mainmenu-pane").animate({left:"-400%"}); 			
			});
		});
