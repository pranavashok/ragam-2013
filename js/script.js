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
(function(window,undefined){

    // Prepare
    var History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !History.enabled ) {
         // History.js is disabled for this browser.
         // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }

    

    // Change our States
    /*History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
    History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
    History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
    History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
    History.back(); // logs {state:3}, "State 3", "?state=3"
    History.back(); // logs {state:1}, "State 1", "?state=1"
    History.back(); // logs {}, "Home Page", "?"
    History.go(2); // logs {state:3}, "State 3", "?state=3"
	*/
	$(function(){
		var w = $(window).width();
		var h = $(window).height();
		// Bind to StateChange Event
	    $(window).bind('statechange',function(){ // Note: We are using statechange instead of popstate
	        var State = History.getState(), // Note: We are using History.getState() instead of event.state
	        	rootUrl = History.getRootUrl(),
	        	relativeUrl = State.url.replace(rootUrl+'magar/', '');
	        //History.log(State.data, State.title, State.url);
	        //alert(relativeUrl);
	        if(relativeUrl=="")
	        {
	        	$("#mainmenu-pane").attr("class", "movein");
				$("#font-pane").attr("class", "movein");	        	
	        }else
	        {
	        		//alert('test');
	        	     loc=relativeUrl.split("/");
	        	     heading.innerHTML = loc[0];
	        }   
	    });

		$("#mainmenu-pane").attr("class", "loading");
		$("#font-pane").attr("class", "loading");
		//setTimeout("setCss('#mainmenu-pane',-25);",5000);
		//setTimeout("setCss('#font-pane',-25);",5000);
		//History.pushState(null, "Ragam 2013", "");
		$("#mainlinks a").click(function(e){
			e.preventDefault();
		});
		$("#mainlinks li").click(function(){
			History.pushState(null, $(this).attr("title") + " | Ragam 2013", $(this).attr("title"));
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
			$("#support-pane").attr("class", "support-up");
		});
		$(document).mouseup(function (e)
		{
			var container = $("#support-pane");
			if (container.has(e.target).length === 0 && $("#wrapper").attr("class")=="support-up")
			{
				container.attr("class", "support-down");
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
			$("#home-button").animate({opacity:'0'});
		});
	});
})(window);