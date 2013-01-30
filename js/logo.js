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
  function g() {
    /////ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg////
    var x=180+radius*4, y = 0;
    context.beginPath();
    context.arc(x, y, radius, .5* Math.PI, 1* Math.PI, false);
    context.moveTo(x,y+radius);
    context.arc(x, y+2*radius, radius, 1.5*Math.PI, 3.5*Math.PI,false);
    context.moveTo(x,3*radius);
    context.arc(x, y+4*radius-1, radius,1.5* Math.PI, 0, true);
    context.lineWidth =thick;
        var grd = context.createLinearGradient(x-radius,y-2*radius,x+radius,y-2*radius);
      // light blue
      grd.addColorStop(0, '#831228');   
      // dark blue
        grd.addColorStop(1, '#9e1630');
        context.strokeStyle = grd;
        context.stroke();
        context.closePath();
        ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm//////
        xm=radius*8+2*thick,ym=0;
        contextm.beginPath();
    contextm.arc(xm+2*radius, ym+2*radius, radius, .80* Math.PI, 0* Math.PI, false);
    contextm.arc(xm+4*radius, ym+2*radius, radius, 1* Math.PI, .5* Math.PI, false);
    contextm.lineWidth =thick;
    var grdm = contextm.createLinearGradient(xm+radius,ym+radius,xm+5*radius,ym+radius);
        grdm.addColorStop(0, '#00b7ec');         
      grdm.addColorStop(1, '#0067c1');
        contextm.strokeStyle = grdm;
    contextm.stroke();
    contextm.closePath();
        ////rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr////////////////////
    xr=0,yr=0
    contextr.beginPath();
    contextr.arc(xr+2*radius, yr+2*radius, radius, 1.20* Math.PI, .67* Math.PI, false);
    moveTo(xr+2*radius, yr+3*radius)
    contextr.arc(xr+2*radius, yr+4*radius, radius, 1.5* Math.PI, 0* Math.PI, false);
     var grdr = contextr.createLinearGradient(xr+radius,yr+radius,xr+3*radius,yr+radius);
     
        grdr.addColorStop(0, '#ed1d24');   
      
        grdr.addColorStop(1, '#b8171c');
    contextr.lineWidth =thick;
    contextr.strokeStyle = grdr;
    contextr.stroke();

    ///aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa//////////////////
    xa=radius*2+thick,ya=0   
    contexta.beginPath();
    contexta.arc((xa+2*radius), ya+2*radius, radius, 0, 2* Math.PI, false);
    contexta.arc(xa+4*radius, ya+2*radius+1, radius, 1* Math.PI, .5* Math.PI, true);
    contexta.lineWidth =thick;
    var grda = contexta.createLinearGradient(xa+radius,ya+2*radius,xa+3*radius,ya+2*radius);
        grda.addColorStop(0, '#89c540');  
        grda.addColorStop(1, '#00b04d');
        contexta.strokeStyle = grda;
        contexta.stroke();
      contexta.closePath();
      

        ///a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2//////////////////
    xa2=radius*6+2*thick,ya2=0
        contexta2.beginPath();
    contexta2.arc(xa2+2*radius, ya2+2*radius, radius, 0, 2* Math.PI, false);
    contexta2.arc(xa2+4*radius, ya2+2*radius+1, radius, 1* Math.PI, .5* Math.PI, true);
    contexta2.lineWidth =thick;
    var grda2 = contexta2.createLinearGradient(xa2+radius,ya2+radius,xa2+3*radius,ya2+radius);
        grda2.addColorStop(0, '#f89a1c');   
      
        grda2.addColorStop(1, '#ee2524');
        contexta2.strokeStyle = grda2;
    contexta2.stroke();
    contexta2.closePath();
        a+=da;
      setTimeout('g()',2);
   }
    g();