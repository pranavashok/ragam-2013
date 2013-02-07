var subDir = 'magar';
var title = '';
var menu;

function setCssR(a) {
	vright = $(a).css("right");
	vtop = $(a).css("top");
	$(a).css({
		right: vright,
		top: vtop
	});
}

function inputFocus(i){
    if(i.value==i.defaultValue)
    	{ i.value=""; i.style.color="#000"; }
}
function inputFocusPass(i){
	if(i.value = i.defaultValue) {
    	i.type='password';
    	i.value='';
    }
}
function inputBlur(i){
    if(i.value==""){ i.value=i.defaultValue; i.style.color="#888"; }
}
function inputBlurPass(i){
    if(i.value=="") { 
    	i.type='text';
    	i.value=i.defaultValue; i.style.color="#888"; 
    }
}

function setCssL(a) {
	vleft = $(a).css("left");
	vtop = $(a).css("top");
	$(a).css({
		left: vleft,
		top: vtop
	});
}

function setMenu(j) {
	menu = j;
}

function loadingAnimation(b) {
	if(b){
		$("#light").show();
		$(".spinner").show();
	}else{
		$("#light").fadeOut();
		$(".spinner").fadeOut();
	}
}

function loadArt() {
	$("#hidden-art").append($("<img id='general'/>").attr("src", "/" + subDir + "/img/general.png"));
	$("#hidden-art").append($("<img id='fine_arts'/>").attr("src", "/" + subDir + "/img/fine_arts.png"));
	$("#hidden-art").append($("<img id='music'/>").attr("src", "/" + subDir + "/img/music.png"));
	$("#hidden-art").append($("<img id='dance'/>").attr("src", "/" + subDir + "/img/dance.png"));
	$("#hidden-art").append($("<img id='thematic'/>").attr("src", "/" + subDir + "/img/thematic.png"));
}
(function (window, undefined) {
	var History = window.History;
	if (!History.enabled) {
		return false;
	}
	$(function () {
		var w = $(window).width();
		var h = $(window).height();
		$("body").keydown(function (event) {
			if (event.which == 27) $("#shortcut").hide();
			if (event.which >= 37 && event.which <= 40) $("#shortcut").show();
		});
		History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
			var State = History.getState(), // Note: We are using History.getState() instead of event.state
				rootUrl = History.getRootUrl(),
				relativeUrl = State.url.replace(rootUrl + subDir + '/', '');
			History.log(State.data, State.title, State.url);
			if (relativeUrl == "") {
				if ($("#mainmenu-pane").attr("class") == "moveout") {
					$("#mainmenu-pane").attr("class", "movein");
					$("#font-pane").attr("class", "movein");
				} else if ($("#mainmenu-pane").attr("class") == "pane") {
					$("#mainmenu-pane").attr("class", "loading");
					$("#font-pane").attr("class", "loading");
					History.pushState({
						timestamp: (new Date().getTime())
					}, "Ragam 2013", "#");
				}
			} else {
				if (relativeUrl[relativeUrl.length - 1] == '/') relativeUrl = relativeUrl.substr(0, relativeUrl.length - 1);
				setCssL('#font-pane');
				setCssR('#mainmenu-pane');
				if($("#mainmenu-pane").attr("class")!="moveout")
					$("#inner-pane").attr("class", "pane"); //Reset the inner-pane just before opening
				$("#mainmenu-pane").attr("class", "moveout");
				$("#font-pane").attr("class", "moveout");
				/*$("#followlinks").animate({
					opacity: '0'
				});*/
				if (relativeUrl.search("/") == -1) { //If it's a first level page
					title = relativeUrl;
					$.ajax({
						dataType: "json",
						url: "/" + subDir + "/manager/rsublinks.php",
						data: {
							"cat": title
						},
						type: "POST",
						success: function (d) {
							setMenu(d);
							var catlinks = "";
							d.forEach(function (ele) {
								catlinks = catlinks + "<a href='/" + subDir + "/" + title + "/" + ele.name.replace(/\ /g, "_") + "'><li>" + ele.name + "</li></a>";
							});
							$("#submenu-links").html(catlinks);
							//$("#submenu-links a").trigger('mouseenter');
							// load content to hidden div
							loadingAnimation(false);			
						}
					});
				} else { //Its a second level url
					$("#painting").fadeOut();
					$("#inner-pane").attr("class", "moveright");

					var n = relativeUrl.split("/");
					eve = relativeUrl.split("/")[n.length - 1];
					$.ajax({
						dataType: "json",
						url: "/" + subDir + "/manager/content.php",
						data: {
							"event": eve
						},
						type: "POST",
						success: function (d) {
							
							$("#content-heading").text(d.name);
							$("#content-content").html(d.content);
							$("#content-wrapper").fadeIn();
							//	$(".nano").nanoScroller();
							$(".nano").nanoScroller({
								scrollTop: '0px'
							});
						}

					});
				}
			}
		});
		$(window).bind('load', function () {
			History.pushState({
				timestamp: (new Date().getTime())
			}, "Ragam 2013 | National Institute of Technology Calicut", "");
			loadingAnimation(false);
		});
		$(".nano").hover(function(){
			$(this).nanoScroller();
		});
		$("#mainlinks a").click(function (e) {
			e.preventDefault();
		});
		

		$("#mainlinks li").click(function () {
			title = $(this).attr('title');
			loadingAnimation(true);
			History.pushState({
				timestamp: (new Date().getTime())
			}, title + " | Ragam 2013", $(this).parent("a").attr("href"));
		});
		$("#submenu-links a").live({
			mouseenter: function () {
				var sublinks = "";
				for (ele in menu) {
					if (menu[ele].name == $(this).text()) {
						for (s in menu[ele]['sublinks']) {
							sublinks = sublinks + "<li><a href='/" + subDir + "/" + title + "/" + menu[ele].name.replace(/\ /g, "_") + "/" + menu[ele]['sublinks'][s].name.replace(/\ /g, "_") + "'>" + menu[ele]['sublinks'][s].name+"<br/><span class='shortdesc'>"+menu[ele]['sublinks'][s].shortdesc+"</span></a></li>";
						}
						break;
					}
				}
				$("#subsubmenu-links").html(sublinks);
				var tmp = $(this).text();
				tmp = tmp.replace(' ', '_');
				//var currBg = $("#painting").css('background-image');
        		//var newBg = $("img#"+tmp).attr("src"); 
        		//currBgs = currBg.replace('url(','').replace(')','').split('/');
        		//newBgs = newBg.split('/');
        		//alert(currBg+' -- '+$("img#"+tmp).attr("src"));
				//if(currBgs[currBgs.lenth-1]!=newBgs[newBgs.length-1])
					$("#painting").css('background-image', 'url("'+ $("img#"+tmp).attr("src") + '")');
				$("#submenu-links a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
			},
			click: function (e) {
				e.preventDefault();
			}
		});
		$("#subsubmenu-links a").live({
			click: function (e) {
				e.preventDefault();
				$("#painting").fadeOut();
				$("#subsubmenu-links a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
				$("#hidden-submenu-links").html($("#submenu-links").html());
				$("#hidden-subsubmenu-links").html($("#subsubmenu-links").html());
				History.pushState(null, $(this).text() + " | Ragam 2013", $(this).attr("href"));
			},
			mouseenter: function(e) {
				$("#subsubmenu-links a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
				$(this).children(".shortdesc").show();
			},
			mouseleave: function(e) {
				$(this).children(".shortdesc").hide();
			}
		});
		$("#content-container").mouseenter(function() {
			if($("#inner-pane").attr("class")=="moveright")
			{
				$("#submenu-links").html($("#hidden-submenu-links").html());
				$("#subsubmenu-links").html($("#hidden-subsubmenu-links").html());
			}
		});
		$(".menu_click").click(function () {
			$("#wrapper").attr("class", "support-up");
			$("#support-pane").attr("class", "support-up");
		});
		$(document).mouseup(function (e) {
			var container = $("#support-pane");
			if (container.has(e.target).length === 0 && $("#wrapper").attr("class") == "support-up") {
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".menu_item").css({"border-bottom":"0px solid white"});
			}
		});
		
		$(".menu_nonclick").click(function()
		{
				var container = $("#support-pane");
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".menu_item").css({"border-bottom":"0px solid white"});
			
		});
		
		$("#home-button").click(function () {
			History.pushState({
				timestamp: (new Date().getTime())
			}, "Ragam 2013", "/" + subDir + "/");
			$("#content-wrapper").fadeOut();
			/*$("#followlinks").animate({
				opacity: '1'
			});*/
			/* Code to reset level zero */
		});
		$('a#signin-link').click(function () {
			if ($("#signin-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/signup.png" />');
				$("#signin-link").attr("class", "enabled");
				$("#dark").attr("class", "overlayoff");
				$("#form-wrapper").fadeOut();
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#signin-link").attr("class", "cancel");
				$("a#login-link").attr("class", "enabled");
				$("a#login-link").html('<img src="/' + subDir + '/img/login.png" />');
				$("#dark").attr("class", "overlayon");
				$("#form-wrapper").fadeIn();
			}
		});
		$('#login-link').click(function () {
			if ($("#login-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/login.png" />');
				$("#login-link").attr("class", "enabled");
				$("#dark").attr("class", "overlayoff");
				$("#form-wrapper").fadeOut();
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#login-link").attr("class", "cancel");
				$("a#signin-link").attr("class", "enabled");
				$("a#signin-link").html('<img src="/' + subDir + '/img/signup.png" />');
				$("#dark").attr("class", "overlayon");
				$("#form-wrapper").fadeIn();
			}
		});
		$('#dark').click(function () {
			    $("#login-link").html('<img src="/' + subDir + '/img/login.png" />');
			    $("#signin-link").html('<img src="/' + subDir + '/img/signup.png" />');
			    $("#login-link").attr("class", "enabled");
			    $("#dark").attr("class", "overlayoff");
			    $("#form-wrapper").fadeOut();

		});
		
		$('.menu_item').click(function()
		{
		$(this).siblings().css({"border-bottom":"0px solid white"});
		$(this).siblings().removeClass("menu_select");
		$(this).css({"border-bottom":"2px solid white"});
		$(this).addClass("menu_select");
		});

		$('.menu_item').mouseover(function()
		{
			$(this).css({"border-bottom":"2px solid white"});
		});
		
		$('.menu_item').mouseout(function()
		{
		if(!($(this).hasClass("menu_select")))
		{
			$(this).css({"border-bottom":"0px solid white"});
		}
		});
		
		
		loadArt();
	});
})(window);
