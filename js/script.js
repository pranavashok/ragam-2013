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
				$("#followlinks").animate({
					opacity: '0'
				});
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
							$("#submenu-links a").trigger('mouseenter');
							// load content to hidden div					
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
			}, "Ragam 2013", "");
		});
		$("#mainlinks a").click(function (e) {
			e.preventDefault();
		});

		$("#mainlinks li").click(function () {
			title = $(this).attr('title');
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
							sublinks = sublinks + "<li><a href='/" + subDir + "/" + title + "/" + menu[ele].name.replace(/\ /g, "_") + "/" + menu[ele]['sublinks'][s].name.replace(/\ /g, "_") + "'>" + menu[ele]['sublinks'][s].name + "</a></li>";
						}
						break;
					}
				}
				$("#subsubmenu-links").html(sublinks);
				$("#submenu-links a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
			},
			click: function (e) {
				e.preventDefault();
			}
		});
		$("#subsubmenu-links a").live('click', function (e) {
			e.preventDefault();
			$("#painting").fadeOut();
			$("#subsubmenu-links a").each(function () {
				$(this).attr("class", "notselected");
			});
			$(this).attr("class", "selected");
			$("#hidden-submenu-links").html($("#submenu-links").html());
			$("#hidden-subsubmenu-links").html($("#subsubmenu-links").html());
			History.pushState(null, $(this).text() + " | Ragam 2013", $(this).attr("href"));
		});
		$("#content-container").mouseenter(function() {
			if($("#inner-pane").attr("class")=="moveright")
			{
				$("#submenu-links").html($("#hidden-submenu-links").html());
				$("#subsubmenu-links").html($("#hidden-subsubmenu-links").html());
			}
		});
		$("#arrow-up").click(function () {
			$("#dark").attr("class", "overlayon");
			$("#wrapper").attr("class", "support-up");
			$("#support-pane").attr("class", "support-up");
		});
		$(document).mouseup(function (e) {
			var container = $("#support-pane");
			if (container.has(e.target).length === 0 && $("#wrapper").attr("class") == "support-up") {
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".support-puller").show();
				$("#dark").attr("class", "overlayoff");
			}
		});
		$("#home-button").click(function () {
			History.pushState({
				timestamp: (new Date().getTime())
			}, "Ragam 2013", "/" + subDir + "/");
			$("#followlinks").animate({
				opacity: '1'
			});
			/* Code to reset level zero */
		});
		$('a#signin-link').click(function () {
			if ($("#signin-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/signup.png" />');
				$("#signin-link").attr("class", "enabled");
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#signin-link").attr("class", "cancel");
				$("a#login-link").attr("class", "enabled");
				$("a#login-link").html('<img src="/' + subDir + '/img/login.png" />');
			}
		});
		$('a#login-link').click(function () {
			if ($("#login-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/login.png" />');
				$("#login-link").attr("class", "enabled");
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#login-link").attr("class", "cancel");
				$("a#signin-link").attr("class", "enabled");
				$("a#signin-link").html('<img src="/' + subDir + '/img/signup.png" />');
			}
		});
	});
})(window);
