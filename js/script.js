var subDir = 'magar';
var title = '';
var aniSpd = 3000;
var fadeSpd = 200;
var menu;

function setCssR(a) {
	vright = $(a).css("right");
	vtop = $(a).css("top");
	$(a).css({
		right: vright,
		top: vtop
	});
}

function inputBlur(i){
    //validation
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
	$("#hidden-art").append($("<img id='general'/>").attr("src", "/" + subDir + "/img/general.jpg"));
	$("#hidden-art").append($("<img id='fine_arts'/>").attr("src", "/" + subDir + "/img/fine_arts.jpg"));
	$("#hidden-art").append($("<img id='music'/>").attr("src", "/" + subDir + "/img/music.jpg"));
	$("#hidden-art").append($("<img id='dance'/>").attr("src", "/" + subDir + "/img/dance.jpg"));
	$("#hidden-art").append($("<img id='thematic'/>").attr("src", "/" + subDir + "/img/thematic.jpg"));
	$("#hidden-art").append($("<img id='literary'/>").attr("src", "/" + subDir + "/img/literary.jpg"));
	$("#hidden-art").append($("<img id='dramatics'/>").attr("src", "/" + subDir + "/img/dramatics.jpg"));

}

function lookup(inputString) {
		if(inputString.length == 0) {
			$('#suggestions').fadeOut(); // Hide the suggestions box
		} 
		else {
			$('#suggestions').fadeIn(); // Show the suggestions box
			$("#s-loader").show();
			$.post("search.php", {q: ""+inputString+""}, function(data) { // Do an AJAX call
				$('#suggestions').html(data); // Fill the suggestions box
				$("#s-loader").hide();
      			});
   		}
}

(function (window, undefined) {
	var History = window.History;
	if (!History.enabled) {
		return false;
	}
	$(function () {
		$("#suggestions").fadeOut();
		$("#feedback").fadeOut();
		var w = $(window).width();
		var h = $(window).height();
		$("body").keydown(function (event) {
			if (event.which == 27) $("#shortcut").hide();
			if (event.which >= 37 && event.which <= 40) { //If direction keys press
				$.getScript('/'+subDir+'/js/shortcut.js', function() {
  					$("#shortcut").show();
				});
			}
		});
		History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
			var State = History.getState(), // Note: We are using History.getState() instead of event.state
				rootUrl = History.getRootUrl(),
				relativeUrl = State.url.replace(rootUrl + subDir + '/', '');
			//History.log(State.data, State.title, State.url);
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
				if(relativeUrl.split("/")[0]=="Events") { //Events section
					$(".pane").hide();
					$("#inner-pane-events").show();
					if($("#mainmenu-pane").attr("class")!="moveout")
						$("#inner-pane-events").attr("class", "pane"); //Reset the inner-pane-events just before opening
					$("#mainmenu-pane").attr("class", "moveout");
					$("#font-pane").attr("class", "moveout");
					if (relativeUrl.search("/") == -1) { //If it's a first level page
						$("#painting-events").fadeIn();
						title = relativeUrl;
						$.ajax({
							dataType: "json",
							url: "/" + subDir + "/manager/fetchlinks.php",
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
								$("#submenu-links-events").html(catlinks);
								loadingAnimation(false);			
							}
						});
					} else { //Its a second level url
						$("#painting-events").fadeOut();
						$("#inner-pane-events").attr("class", "moveright");
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

								if(d.name!=null){
									$("#content-heading-events").text(d.name);
									$("#content-content-events").html(d.content);
								}else{
									$("#content-heading-events").text("Choose an event from right");
								}
								$("#content-wrapper-events").fadeIn();
								$(".nano").nanoScroller({
									scrollTop: '0px'
								});
							}
						});
						//Load menu
						title = relativeUrl.split('/')[0];
						category = relativeUrl.split('/')[1];
						subcategory = relativeUrl.split('/')[2];
						$.ajax({
							dataType: "json",
							url: "/" + subDir + "/manager/fetchlinks.php",
							data: {
								"cat": title
							},
							type: "POST",
							success: function (d) {
								setMenu(d);
								var catlinks = "";
								d.forEach(function (ele) {
									if(ele.name == category)
										catlinks = catlinks + "<a href='/" + subDir + "/" + title + "/" + ele.name.replace(/\ /g, "_") + "' class='selected'><li>" + ele.name + "</li></a>";
									else
										catlinks = catlinks + "<a href='/" + subDir + "/" + title + "/" + ele.name.replace(/\ /g, "_") + "' class='notselected'><li>" + ele.name + "</li></a>";
								});
								sublinks='';
								for (ele in menu) {
									if (menu[ele].name == category) {
										for (s in menu[ele]['sublinks']) {
											if(menu[ele]['sublinks'][s].name == subcategory)
												sublinks = sublinks + "<li><a href='/" + subDir + "/" + title + "/" + menu[ele].name.replace(/\ /g, "_") + "/" + menu[ele]['sublinks'][s].name.replace(/\ /g, "_") + "' class='selected'>" + menu[ele]['sublinks'][s].name+"<br/><span class='shortdesc'>"+menu[ele]['sublinks'][s].shortdesc+"</span></a></li>";
											else
												sublinks = sublinks + "<li><a href='/" + subDir + "/" + title + "/" + menu[ele].name.replace(/\ /g, "_") + "/" + menu[ele]['sublinks'][s].name.replace(/\ /g, "_") + "' class='notselected'>" + menu[ele]['sublinks'][s].name+"<br/><span class='shortdesc'>"+menu[ele]['sublinks'][s].shortdesc+"</span></a></li>";
										}
										break;
									}
								}
								$("#hidden-submenu-links").html(catlinks);
								$("#hidden-subsubmenu-links").html(sublinks);
								$("#submenu-links-events").html($("#hidden-submenu-links").html());
								$("#subsubmenu-links-events").html($("#hidden-subsubmenu-links").html());
								loadingAnimation(false);			
							}
						});
					}
				} //Endif events
				else if(relativeUrl.split("/")[0]=="Workshops") {
					//Workshops code comes here
					$(".pane").hide();
					$("#inner-pane-workshops").show();
					if($("#mainmenu-pane").attr("class")!="moveout")
						$("#inner-pane-workshops").attr("class", "pane"); //Reset the inner-pane-workshops just before opening
					$("#mainmenu-pane").attr("class", "moveout");
					$("#font-pane").attr("class", "moveout");
					if (relativeUrl.search("/") == -1) { //If it's a first level page
						$("#painting-workshops").fadeIn();
						title = relativeUrl;
						$.ajax({
							dataType: "json",
							url: "/" + subDir + "/manager/fetchlinks.php",
							data: {
								"cat": title
							},
							type: "POST",
							success: function (d) {
								setMenu(d);
								var links = "";
								d.forEach(function (ele) {
									links = links + "<a href='/" + subDir + "/" + title + "/" + ele.name.replace(/\ /g, "_") + "'><li>" + ele.name + "</li></a>";
								});
								$("#submenu-links-workshops").html(links);
								loadingAnimation(false);			
							}
						});
					} else { //Its a second level url
						$("#painting-workshops").fadeOut();
						$("#inner-pane-workshops").attr("class", "moveright");

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
								
								$("#content-heading-workshops").text(d.name);
								$("#content-content-workshops").html(d.content);
								$("#content-wrapper-workshops").fadeIn();
								$(".nano").nanoScroller({
									scrollTop: '0px'
								});
							}

						});
					}

				} //Endif workshops
				else if(relativeUrl.split("/")[0]=="Proshows") {
					//Proshows code
					$(".pane").hide();
					$("#inner-pane-proshows").show();
					if($("#mainmenu-pane").attr("class")!="moveout")
						$("#inner-pane-proshows").attr("class", "pane"); //Reset the inner-pane-proshows just before opening
					$("#mainmenu-pane").attr("class", "moveout");
					$("#font-pane").attr("class", "moveout");
					$("#painting-proshows").fadeIn();
					title = relativeUrl;
					loadingAnimation(false);
				} //Endif proshows
				else if(relativeUrl.split("/")[0]=="Showcase") {
					//Showcase code
					$(".pane").hide();
					$("#inner-pane-showcase").show();
					if($("#mainmenu-pane").attr("class")!="moveout")
						$("#inner-pane-showcase").attr("class", "pane"); //Reset the inner-pane-showcase just before opening
					$("#mainmenu-pane").attr("class", "moveout");
					$("#font-pane").attr("class", "moveout");
					if (relativeUrl.search("/") == -1) { //If it's a first level page
						$("#painting-showcase").fadeIn();
						title = relativeUrl;
						$.ajax({
							dataType: "json",
							url: "/" + subDir + "/manager/fetchlinks.php",
							data: {
								"cat": title
							},
							type: "POST",
							success: function (d) {
								setMenu(d);
								var links = "";
								d.forEach(function (ele) {
									links = links + "<a href='/" + subDir + "/" + title + "/" + ele.name.replace(/\ /g, "_") + "'><li>" + ele.name + "</li></a>";
								});
								$("#submenu-links-showcase").html(links);
								loadingAnimation(false);			
							}
						});
					} else { //Its a second level url
						$("#painting-showcase").fadeOut();
						$("#inner-pane-showcase").attr("class", "moveright");

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
								
								$("#content-heading-showcase").text(d.name);
								$("#content-content-showcase").html(d.content);
								$("#content-wrapper-showcase").fadeIn();
								$(".nano").nanoScroller({
									scrollTop: '0px'
								});
							}

						});
					}
				} //Endif showcase
				else if(relativeUrl.split("/")[0]=="Sponsors") {
					//Sponsors code
					$(".pane").hide();
					$("#inner-pane-sponsors").show();
					if($("#mainmenu-pane").attr("class")!="moveout")
						$("#inner-pane-sponsors").attr("class", "pane"); //Reset the inner-pane-sponsors just before opening
					$("#mainmenu-pane").attr("class", "moveout");
					$("#font-pane").attr("class", "moveout");
					$("#painting-sponsors").fadeIn();
					title = relativeUrl;
					loadingAnimation(false);
				} //Endif sponsors
				else {
					//Go to 404
				}
			}
		});
		$(window).bind('load', function () {
			History.pushState({
				timestamp: (new Date().getTime())
			}, "Ragam 2013 | National Institute of Technology Calicut", "");
			loadingAnimation(false);
		});
		var startIndex = 0;
		var endIndex = $('#ticker div').length;
		$('#ticker div:first').fadeIn(fadeSpd);

		window.setInterval(function() {
			$('#ticker div:eq(' + startIndex + ')').delay(fadeSpd).fadeOut(fadeSpd);
			    startIndex++;
			    $('#ticker div:eq(' + startIndex + ')').stop(true,true).fadeIn(fadeSpd);
		        if (endIndex == startIndex) startIndex = -1;
	    }, aniSpd);
	    
		$(".nano").hover(function(){
			$(this).nanoScroller();
		});
		$("#mainlinks a").click(function (e) {
			e.preventDefault();
		});
		

		$("#mainlinks li").click(function () {
			title = $(this).data('title');
			loadingAnimation(true);
			History.pushState({timestamp: (new Date().getTime())}, title + " | Ragam 2013", $(this).parent("a").attr("href"));
		});
		$("#submenu-links-events a").live({
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
				$("#subsubmenu-links-events").html(sublinks);
				var tmp = $(this).text();
				tmp = tmp.replace(' ', '_');
				
				$("#painting-events").hide();
				$("#painting-events").css('background-image', 'url("'+ $("img#"+tmp).attr("src") + '")');
				if($('#inner-pane-events').attr('class')!='moveright')	
					$("#painting-events").stop(true,true).fadeIn(250);
				
				$("#submenu-links-events a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
			},
			click: function (e) {
				e.preventDefault();
			}
		});
		$("#subsubmenu-links-events a").live({
			click: function (e) {
				e.preventDefault();
				$("#painting-events").fadeOut();
				$("#subsubmenu-links-events a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
				$("#hidden-submenu-links").html($("#submenu-links-events").html());
				$("#hidden-subsubmenu-links").html($("#subsubmenu-links-events").html());
				title = $(this).html();
				title = title.split('<br>')[0];
				History.pushState(null, title + " | Ragam 2013", $(this).attr("href"));
			},
			mouseenter: function(e) {
				$("#subsubmenu-links-events a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
				$(this).children(".shortdesc").show();
			},
			mouseleave: function(e) {
				$(this).children(".shortdesc").hide();
			}
		});
		$("#content-container-events").mouseenter(function() {
			if($("#inner-pane-events").attr("class")=="moveright")
			{
				$("#submenu-links-events").html($("#hidden-submenu-links").html());
				$("#subsubmenu-links-events").html($("#hidden-subsubmenu-links").html());
			}
		});
		$(".menu_click").click(function () {
			$("#wrapper").attr("class", "support-up");
			$("#support-pane").attr("class", "support-up");
			$("#menu_tab").attr("class","up");
		});
		$(document).mouseup(function (e) {
			var container = $("#support-pane");
			if (container.has(e.target).length === 0 && $("#wrapper").attr("class") == "support-up") {
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".menu_item").css({"border-bottom":"0px solid #444"});
			}
		});
		



	$("#submenu-links-workshops a").live({
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
				$("#subsubmenu-links-workshops").html(sublinks);
				var tmp = $(this).text();
				tmp = tmp.replace(' ', '_');
				//var currBg = $("#painting").css('background-image');
        		//var newBg = $("img#"+tmp).attr("src"); 
        		//currBgs = currBg.replace('url(','').replace(')','').split('/');
        		//newBgs = newBg.split('/');
        		//alert(currBg+' -- '+$("img#"+tmp).attr("src"));
				//if(currBgs[currBgs.lenth-1]!=newBgs[newBgs.length-1])
				$("#painting-workshops").hide();
				$("#painting-workshops").css('background-image', 'url("'+ $("img#"+tmp).attr("src") + '")');	
				$("#painting-workshops").stop(true,true).fadeIn(250);
				
				$("#submenu-links-workshops a").each(function () {
					$(this).attr("class", "notselected");
				});
				$(this).attr("class", "selected");
			},
			click: function (e) {
				e.preventDefault();
				History.pushState(null, $(this).text() + " | Ragam 2013", $(this).attr("href"));
			}
		});



		$(".menu_nonclick").click(function()
		{
			if($("#menu_tab").hasClass("up"))
			{
				var container = $("#support-pane");
				container.attr("class", "support-down");
				$("#wrapper").attr("class", "support-down");
				$(".menu_item").css({"border-bottom":"0px solid #444"});
				$("#menu_tab").removeClass("up");
			}
		});
		
		$("#home-button").click(function () {
			History.pushState({
				timestamp: (new Date().getTime())
			}, "Ragam 2013 | National Institute of Technology Calicut", "/" + subDir + "/");
			$("#font-pane").show();
			$("#mainmenu-pane").show();
			$("#support-pane").fadeIn();
			$("#content-wrapper-events").fadeOut();
		});

		$('a#signin-link').click(function () {
			if ($("#signin-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/signup.png" />');
				$("#signin-link").attr("class", "enabled");
				$("#dark").attr("class", "overlayoff");
				$("#signup-form-wrapper").hide();
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#signin-link").attr("class", "cancel");
				$("a#login-link").attr("class", "enabled");
				$("a#login-link").html('<img src="/' + subDir + '/img/login.png" />');
				$("#dark").attr("class", "overlayon");
				$("#login-form-wrapper").hide();
				$("#signup-form-wrapper").fadeIn();
			}
		});
		$('#login-link').click(function () {
			if ($("#login-link").attr("class") == "cancel") {
				$(this).html('<img src="/' + subDir + '/img/login.png" />');
				$("#login-link").attr("class", "enabled");
				$("#dark").attr("class", "overlayoff");
				$("#login-form-wrapper").hide();
			} else {
				$(this).html('<img src="/' + subDir + '/img/cancel.png" />');
				$("a#login-link").attr("class", "cancel");
				$("a#signin-link").attr("class", "enabled");
				$("a#signin-link").html('<img src="/' + subDir + '/img/signup.png" />');
				$("#dark").attr("class", "overlayon");
				$("#signup-form-wrapper").hide();
				$("#login-form-wrapper").fadeIn();
			}
		});
		$('#dark').click(function () {
		    $("#login-link").html('<img src="/' + subDir + '/img/login.png" />');
		    $("#signin-link").html('<img src="/' + subDir + '/img/signup.png" />');
		    $("#login-link").attr("class", "enabled");
		    $("#dark").attr("class", "overlayoff");
		    $("#login-form-wrapper").hide();
		    $("#signup-form-wrapper").hide();
		});
		$(".gallery").click(function()
		{
			$("#gallery").show();
			$("#gallery").attr("class", "overlayon");
		});
		$(".feedback_link").click(function()
		{
				$("#feedback").show();
				$("#feedback").attr("class", "overlayon");
		});
		$("#feedback").click(function () {
				$("#feedback").hide();
				$("#feedback").attr("class", "overlayoff");
		});
		$("#gallery").click(function () {
			$("#gallery").hide();
			$("#gallery").attr("class", "overlayoff");
		});
		$('.menu_item').click(function()
		{
			$(this).siblings().css({"border-bottom":"0px solid #444"});
			$(this).siblings().removeClass("menu_select");
			$(this).css({"border-bottom":"2px solid #444"});
			$(this).addClass("menu_select");
			if($('.menu_select').text() == 'contacts') {
				$("#info").hide();
				$("#reachus").hide();
				$("#contacts").fadeIn();
			}
			else if($('.menu_select').text() == 'reach us') {
				$("#info").hide();
				$("#contacts").hide();
				$("#reachus").fadeIn();
			}
			else if($('.menu_select').text() == 'faq') {
				$("#contacts").hide();
				$("#reachus").hide();
				$("#info").fadeIn();
			}
		});

		$('.menu_item').mouseover(function()
		{
			$(this).css({"border-bottom":"2px solid #444"});
		});
		
		$('.menu_item').mouseout(function()
		{
		if(!($(this).hasClass("menu_select")))
		{
			$(this).css({"border-bottom":"0px solid #444	"});
		}
		});
		
		$("#font-pane").bind('mousewheel', function(event) {
    		if (event.originalEvent.wheelDelta >= 0) {
        			if($("#wrapper").attr("class")!="support-down") {
        				$("#wrapper").attr("class", "support-down");
        				$("#support-pane").attr("class", "support-down");
        			}
    		}
    		else {
        		if($("#wrapper").attr("class")!="support-up"){
        			$("#wrapper").attr("class", "support-up");
					$("#support-pane").attr("class", "support-up");
				}
    		}
		});

		$('[title]').mouseover(function () {
        	$(this).data('title', $(this).attr('title'));
        	$(this).attr('title', '');
    	}).mouseout(function () {
    	    $(this).attr('title', $(this).data('title'));
    });
		loadArt();
	});
})(window);
