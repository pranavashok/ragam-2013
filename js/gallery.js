$(function(){
				
				var Photo	= (function() {
					
						// list of thumbs
					var $list		= $('#pe-thumbs'),
						// list's width and offset left.
						// this will be used to know the position of the description container
						listW		= $list.width(),
						listL		= $list.offset().left,
						// the images
						$elems		= $list.find('img'),
						// the description containers
						$descrp		= $list.find('div.pe-description'),
						// maxScale : maximum scale value the image will have
						// minOpacity / maxOpacity : minimum (set in the CSS) and maximum values for the image's opacity
						settings	= {
							maxScale	: 1.4,
							maxOpacity	: 0.9,
							minOpacity	: Number( $elems.css('opacity') )
						},
						init		= function() {
							
							// minScale will be set in the CSS
							settings.minScale = _getScaleVal() || 1;
							// preload the images (thumbs)
							_loadImages( function() {
								
								_calcDescrp();
								_initEvents();
							
							});
						
						},
						deinit		= function() {
							$elems.off('proximity.Photo', function() { alert("gallery closed")});
						},
						// Get Value of CSS Scale through JavaScript:
						// http://css-tricks.com/get-value-of-css-rotation-through-javascript/
						_getScaleVal= function() {
						
							var st = window.getComputedStyle($elems.get(0), null),
								tr = st.getPropertyValue("-webkit-transform") ||
									 st.getPropertyValue("-moz-transform") ||
									 st.getPropertyValue("-ms-transform") ||
									 st.getPropertyValue("-o-transform") ||
									 st.getPropertyValue("transform") ||
									 "fail...";

							if( tr !== 'none' ) {	 

								var values = tr.split('(')[1].split(')')[0].split(','),
									a = values[0],
									b = values[1],
									c = values[2],
									d = values[3];

								return Math.sqrt( a * a + b * b );
							
							}
							
						},
						// calculates the style values for the description containers,
						// based on the settings variable
						_calcDescrp	= function() {
							
							$descrp.each( function(i) {
							
								var $el		= $(this),
									$img	= $el.prev(),
									img_w	= $img.width(),
									img_h	= $img.height(),
									img_n_w	= settings.maxScale * img_w,
									img_n_h	= settings.maxScale * img_h,
									space_t = ( img_n_h - img_h ) / 2,
									space_l = ( img_n_w - img_w ) / 2;
								
								$el.data( 'space_l', space_l ).css({
									height	: settings.maxScale * $el.height(),
									top		: -space_t,
									left	: img_n_w - space_l
								});
							
							});
						
						},
						_initEvents	= function() {
						
							$elems.on('proximity.Photo', { max: 80, throttle: 10, fireOutOfBounds : true }, function(event, proximity, distance) {
								
								var $el			= $(this),
									$li			= $el.closest('li'),
									$desc		= $el.next(),
									scaleVal	= proximity * ( settings.maxScale - settings.minScale ) + settings.minScale,
									scaleExp	= 'scale(' + scaleVal + ')';
								
								// change the z-index of the element once it reaches the maximum scale value
								// also, show the description container
								if( scaleVal === settings.maxScale ) {
									
									$li.css( 'z-index', 1000 );
									
									if( $desc.offset().left + $desc.width() > listL + listW ) {
										
										$desc.css( 'left', -$desc.width() - $desc.data( 'space_l' ) );
									
									}
									
									$desc.fadeIn( 800 );
									
								}	
								else {
									
									$li.css( 'z-index', 1 );
								
									$desc.stop(true,true).hide();
								
								}	
								
								$el.css({
									'-webkit-transform'	: scaleExp,
									'-moz-transform'	: scaleExp,
									'-o-transform'		: scaleExp,
									'-ms-transform'		: scaleExp,
									'transform'			: scaleExp,
									'opacity'			: ( proximity * ( settings.maxOpacity - settings.minOpacity ) + settings.minOpacity )
								});

							});
						
						},
						_loadImages	= function( callback ) {
							
							var loaded 	= 0,
								total	= $elems.length;
							
							$elems.each( function(i) {
								
								var $el = $(this);
								
								$('<img/>').load( function() {
									
									++loaded;
									if( loaded === total )
										callback.call();
									
								}).attr( 'src', $el.attr('src') );
							
							});
						
						};
					
					return {
						init	: init
					};
				
				})();
				Photo.init();
				
			});
