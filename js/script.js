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
				if(relativeUrl.search("/") == -1) { //If it's a first level page
					title = relativeUrl;
					$.ajax({
						dataType: "json",
						url: "manager/rsublinks.php",
						data: {
							"cat": title
						},
						type: "POST",
						success: function (d) {
							setMenu(d);
							var catlinks = "";
							d.forEach(function (ele) {
								catlinks = catlinks + "<a href='"+title+"/"+ele.name.replace(" ","-")+"'><li>" + ele.name + "</li></a>";
							});
							$("#submenu-links").html(catlinks);
							// load content to hidden div					
						}
					});
				}
			}
		});
		$(window).bind('load', function () {
			$(window).trigger('statechange');
		});
		$("#mainlinks a").click(function (e) {
			e.preventDefault();
		});
		$("#mainlinks li").click(function () {
			title = $(this).attr('title');
			$.ajax({
				dataType: "json",
				url: "manager/rsublinks.php",
				data: {
					"cat": title
				},
				type: "POST",
				//beforeSend: function () {
				// 	alert("sfd");},

				success: function (d) {
					setMenu(d);
					var catlinks = "";
					d.forEach(function (ele) {
						catlinks = catlinks + "<a href='"+title+"/"+ele.name.replace(" ","-")+"'><li>" + ele.name + "</li></a>";
					});
					$("#submenu-links").html(catlinks);
					// load content to hidden div					
				}
			});
			History.pushState(null, title + " | Ragam 2013", title);
			$(window).trigger('statechange');
		});
		$("#submenu-links a").live({
			mouseenter: function () {
				var sublinks = "";
				for (ele in menu) {
					if (menu[ele].name == $(this).text()) {
						for(s in menu[ele]['sublinks']) {
							sublinks = sublinks + "<a href='"+title+"/"+menu[ele].name.replace(" ","-")+"/"+menu[ele]['sublinks'][s].name.replace(" ","-")+"'><li>" + menu[ele]['sublinks'][s].name + "</li></a>";
						}
						break;
					}
				}
				$("#subsubmenu-links").html(sublinks);
			},
			mouseleave: function() {
				$("#submenu-links a").each(function() {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
			},
			click: function(e) {
				e.preventDefault();
			}
		});
		$("#subsubmenu-links a").live('click', function (e) {
			e.preventDefault();
			$("#painting").fadeOut();
			$("#inner-pane").attr("class", "moveright");
			$(this).attr("class", "selected");
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
		$("#subsubmenu-links li a").click(function () {
			$("#inner-pane").attr("class", "moveright");
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
