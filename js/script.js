/*function initialize()
{
	$("#mainmenu-pane").animate({right:'70%'},'slow', 'easeInOutQuad', function(){ $("#mainmenu-pane").rotate({angle:0, animateTo:-25})});
	$("#font-pane").animate({left:'30%'}, 'slow', 'easeInOutQuad', function(){ $("#font-pane").rotate({angle:0, animateTo:-25})});
	//$("#submenu-pane").rotate({angle:-15});
	//$("#content-pane").rotate({angle:-15});
	$("#home-button").hide();
}*/
function setCssR(a){
	vright = $(a).css("right");	
	vtop = $(a).css("top");
	$(a).css({right: vright, top: vtop});
}
function setCssL(a){
	vleft = $(a).css("left");
	vtop = $(a).css("top");
	$(a).css({left: vleft, top: vtop});
}
$(document).ready(function(){
	var w = $(window).width();
	var h = $(window).height();
	
	
	$("#mainmenu-pane").attr("class", "loading");
	$("#font-pane").attr("class", "loading");
	//setTimeout("setCss('#mainmenu-pane',-25);",5000);
	//setTimeout("setCss('#font-pane',-25);",5000);
	$("#mainlinks li").click(function(){
		setCssL('#font-pane');
		setCssR('#mainmenu-pane');
		$("#font-pane").attr("class", "moveout");
		$("#mainmenu-pane").attr("class", "moveout");

		$("#followlinks").animate({opacity:'0'});
	});
	$("#arrow-up").click(function(){
		//$("#mainmenu-pane").addClass('support');
		//$("#font-pane").addClass('support');
		$("#wrapper").attr("class", "support-up");
		$("#support-pane").addClass('support');
	});
	$(document).mouseup(function (e)
	{
		var container = $("#support-pane");
		if (container.has(e.target).length === 0)
		{
			container.removeClass('support');
			//$("#mainmenu-pane").removeClass('support');
			//$("#font-pane").removeClass('support');
			$("#wrapper").attr("class", "support-down");
			$(".support-puller").show();
		}
	});
	$("#sublinks li a").click(function(){
		$("#content-pane").attr("class", "rotate");
		$("#submenu-pane").attr("class", "rotate");
	});

	$("#home-button").click(function(){
		/* Code to reset level zero */
		$("#font-pane").attr("class", "movein");
		$("#mainmenu-pane").attr("class", "movein");
		/* Code to reset level one */
		$("#followlinks").animate({opacity:'1'});
		/* Code to reset level zero */
	});
});
