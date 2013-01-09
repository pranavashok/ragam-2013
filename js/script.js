function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', 'easeInOutQuad', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', 'easeInOutQuad', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	$("#submenu-pane").rotate({angle:-15});
	$("#contents-pane").rotate({angle:-15});
}
$(document).ready(function(){
			var w = $(window).width();
			var mstate = 0;
			initialize();
			$("#mainlinks li").click(function(){
				if(mstate == 0)
				{
				$("#font-pane").css({left: w*0.3+'px'});
				$("#font-pane").stop().animate({left:'100%', top:'-160%'}, 1500, 'easeOutQuart');
				$("#mainmenu-pane").stop().animate({right:'100%', top:'-70%'}, 1500, 'easeOutQuart', function() { mstate = 1; });
				}
			});
			$("#mainmenu-pane").click(
				function(){
					if(mstate == 1) {
						mstate = 0;
						$("#mainmenu-pane").stop().animate({right:'70%', top:'-100%'}, 1500, 'easeOutQuart');
						$("#font-pane").stop().animate({left:'30%', top:'-100%'}, 1500, 'easeOutQuart');
						$("#font-pane").css({left: w*0.3+'px'});
					}
				});
});
