var canvas = document.getElementById('lettera');
  var contexta = canvas.getContext('2d');
  var canvas = document.getElementById('letterm');
  var contextm = canvas.getContext('2d');
  var canvas = document.getElementById('lettera2');
  var contexta2 = canvas.getContext('2d');
  var canvas = document.getElementById('letterg');
  var context = canvas.getContext('2d');
  var canvas = document.getElementById('letterr');
  var contextr = canvas.getContext('2d');
  var radius = 70;
  var thick=40;
  var counterClockwise = true;
  var  a=0, da=0.01 ;

		context.translate(radius*4, 0);
	function g() {
		var x= 180, y = 02;
		context.beginPath();
		context.arc(x, y, radius, .5* Math.PI, 1* Math.PI, false);
		context.moveTo(x,y+radius);
		context.arc(x, y+2*radius, radius, 1.5*Math.PI, 3.5*Math.PI,false);
		context.moveTo(x,3*radius);
		context.arc(x, y+4*radius-1, radius,1.5* Math.PI, 0, true);
		context.lineWidth =thick;
      // add linear gradient
      var grd = context.createLinearGradient(canvas.width*Math.cos(a), canvas.height*Math.sin(a), canvas.width*Math.cos(a+Math.PI), canvas.height*Math.sin(a+Math.PI));
      // light blue
      grd.addColorStop(0, '#8ED600');   
      // dark blue
      grd.addColorStop(1, '#0044FF');
      context.strokeStyle = grd;

      context.stroke();
      context.closePath();
      a+=da;

      setTimeout('g()',2);
   }
    g();

xm=0,ym=0

        contextm.translate(radius*8+2*thick, 0);
         contextm.beginPath();
		contextm.arc(xm+2*radius, ym+2*radius, radius, .80* Math.PI, 0* Math.PI, false);
		//moveTo(xm+4*radius, ym+3*radius)
		contextm.arc(xm+4*radius, ym+2*radius, radius, 1* Math.PI, .5* Math.PI, false);

contextm.lineWidth =thick;

 contextm.strokeStyle = '#451234';
		contextm.stroke();
		contextm.closePath();
////////////aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
         xa=0,ya=0
        contexta.translate(radius*2+thick,0);
         contexta.beginPath();
		contexta.arc(xa+2*radius, ya+2*radius, radius, 0, 2* Math.PI, false);
		contexta.arc(xa+4*radius, ya+2*radius+1, radius, 1* Math.PI, .5* Math.PI, true);
		contexta.lineWidth =thick;
		contexta.stroke();
		contexta.closePath();
		/////
//////////////a2a2a2a2aa2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2
		xa2=0,ya2=0
        contexta2.translate(radius*6+2*thick, 0);
        contexta2.beginPath();
		contexta2.arc(xa2+2*radius, ya2+2*radius, radius, 0, 2* Math.PI, false);
		contexta2.arc(xa2+4*radius, ya2+2*radius+1, radius, 1* Math.PI, .5* Math.PI, true);
		contexta2.lineWidth =thick;
		contexta2.stroke();
		contexta2.closePath();

/////////////rrrrrrrrrrrrrrrrrrrrrrrr///////////////////
xr=0,yr=0
var canvas = document.getElementById('letterr');
	var contextr = canvas.getContext('2d');
         contextr.beginPath();
		contextr.arc(xr+2*radius, yr+2*radius, radius, 1.20* Math.PI, .67* Math.PI, false);
		moveTo(xr+2*radius, yr+3*radius)
		contextr.arc(xr+2*radius, yr+4*radius, radius, 1.5* Math.PI, 0* Math.PI, false);

contextr.lineWidth =thick;
contextr.strokeStyle = '#451234';
		contextr.stroke();

//////mmmmmmmmmmmmmmmmmmmmmmmmmmmm/////////////