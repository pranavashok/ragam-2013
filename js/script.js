var subDir = 'magar';
var menu;

function setCssR(a) {
	vright = $(a).css("right");
	vtop = $(a).css("top");
	$(a).css({
		right: vright,
		top: vtop
	});
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
(function (window, undefined) {
	var History = window.History; 
	if (!History.enabled) {return false;} 
	$(function () {
		var w = $(window).width();
		var h = $(window).height();

		$(window).bind('statechange', function () { // Note: We are using statechange instead of popstate
			var State = History.getState(), // Note: We are using History.getState() instead of event.state
			rootUrl = History.getRootUrl(),
			relativeUrl = State.url.replace(rootUrl + subDir + '/', '');
			//History.log(State.data, State.title, Stateurl);
			if (relativeUrl == "") {
				if ($("#mainmenu-pane").attr("class") == "moveout") {
					$("#mainmenu-pane").attr("class", "movein");
					$("#font-pane").attr("class", "movein");
					$("#content-pane").attr("class", "rotatein");
					$("#submenu-pane").attr("class", "rotatein");
				} else if ($("#mainmenu-pane").attr("class") == "pane") {
					$("#mainmenu-pane").attr("class", "loading");
					$("#font-pane").attr("class", "loading");
					History.pushState(null,"Ragam 2013","");
				}
			} else {
				setCssL('#font-pane');
				setCssR('#mainmenu-pane');
				$("#mainmenu-pane").attr("class", "moveout");
				$("#font-pane").attr("class", "moveout");
				$("#followlinks").animate({
					opacity: '0'
				});
				loc = relativeUrl.split("/");
				$("#heading").text(loc[0]);
			}
		});
		$(window).bind('load', function () {
			$(window).trigger('statechange');
		});
		$("#mainlinks a").click(function (e) {
			e.preventDefault();
		});
		$("#mainlinks li").click(function () {


			$.ajax({
				dataType: "json",
				url: "manager/rsublinks.php",
				data: {
					"cat": $(this).attr('title')
				},
				type: "POST",
				//beforeSend: function () {
				// 	alert("sfd");},

				success: function (d) {
					setMenu(d);
					var slinks = "";
					d.forEach(function (ele) {
						slinks = slinks + "<li>" + ele.name + "</li>";
					});
					$("#submenu-links").html(slinks);
					// load content to hidden div					
				}
			});
			History.pushState(null, $(this).attr("title") + " | Ragam 2013", $(this).attr("title"));
			$(window).trigger('statechange');
		});
		$("#submenu-links li").live({
			mouseenter: function () {
				var sslinks = "";
				for (ele in menu) {
					if (menu[ele].name == $(this).text()) {
						menu[ele]['sublinks'].forEach(function (s) {
							sslinks = sslinks + "<li>" + s.name + "</li>";
						});
						break;
					}
				}
				$("#subsubmenu-links").html(sslinks);
			}
		});
		$("#subsubmenu-links li").live('click', function () {
			$("#inner-pane").attr("class", "moveright");
		});
		$("#arrow-up").click(function () {
			$("#wrapper").attr("class", "support-up");
			$("#support-pane").attr("class", "support-up");
		});
		$("#logcancel").click(function(e) {
	    		$("#login-pane").attr("class", "move-up");
	    		$("#wrapper").attr("class", "login-up");
	   	});
		$(document).mouseup(function (e) {
			var container = $("#support-pane");
			if (container.has(e.target).length === 0 && $("#wrapper").attr("class") == "support-up") {
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".support-puller").show();
			}
		});
		$("#sublinks li a").click(function () {
			$("#content-pane").attr("class", "rotateout");
			$("#submenu-pane").attr("class", "rotateout");
		});

		$("#home-button").click(function () {
			/* Code to reset level zero */
			//Handled by statechange bind
			/* Code to reset level one */
			$("#followlinks").animate({
				opacity: '1'
			});
			/* Code to reset level zero */

//			$(window).trigger('statechange');
		});
	});
})(window);
