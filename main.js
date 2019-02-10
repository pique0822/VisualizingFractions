function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function draw_fraction(num,denom){

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000000";


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);



  int = Math.floor(num/denom);
  if(denom == 0)
  {
    int = 0;
  }


  ctx.fillStyle = red;

  if(num/denom == int){
    center_x = canvas.width/(2+int-1);
  }
  else{
    center_x = canvas.width/(2+int);
    r = Math.floor(200- 30*int);
  }
  center_y = canvas.height/2;
  if(num == 0)
  {
    ctx.beginPath();
    ctx.arc(center_x/2,center_y,r,0,2*Math.PI);
    ctx.stroke();
    return;
  }
  // This is if num > denom
    for(var i = 1; i <= int; i++)
    {
      // Outer circle
      ctx.beginPath();
      ctx.arc(center_x*i,center_y,r,0,2*Math.PI);
      ctx.stroke();

      // Outer circle
      ctx.beginPath();
      ctx.fillStyle = red;
      ctx.arc(center_x*i,center_y,r,0,2*Math.PI);
      ctx.fill();

      // Draws the black lines for the cirlce
      for(var j = 0; j < denom; j++)
      {
          ctx.beginPath();
          ctx.moveTo(center_x*i,center_y);
          angle = j*2*Math.PI/(denom);
          // console.log(angle);
          ctx.lineTo(center_x*i+r*Math.cos(angle),center_y-r*Math.sin(angle));
          ctx.stroke();

          font = 40-(int)*2
          inbetween_angle = (2*j-1)/2*2*Math.PI/(denom);
          topx = center_x*(i)+r/2*Math.cos(inbetween_angle)-font/3
          topy = center_y-2*r/3*Math.sin(inbetween_angle)


          ctx.fillStyle = "#000000";
          ctx.font = font+"px Georgia";
          ctx.fillText(1, topx, topy);
          ctx.fillText("_",topx-font/20,topy+font/20);
          ctx.fillText(denom, topx, topy+font);
      }
    }
    // Draws the actual fraction
    if(num/denom == int){

      // Draws the filled in circle
      ctx.fillStyle = red;
      ctx.beginPath();
      angle = 2*Math.PI/(denom/num);
      ctx.moveTo(center_x*(int),center_y);
      ctx.lineTo(center_x*(int)+r,center_y);
      ctx.arc(center_x*(int),center_y,r,0,angle);
      ctx.lineTo(center_x*(int),center_y)
      ctx.fill();

      for(var i = 0; i < denom; i++)
      {

          ctx.beginPath();
          ctx.moveTo(center_x*(int),center_y);
          angle = i*2*Math.PI/(denom);
          ctx.lineTo(center_x*(int)+r*Math.cos(angle),center_y-r*Math.sin(angle));
          ctx.stroke();

          font = 40-(int)*2
          inbetween_angle = (2*i-1)/2*2*Math.PI/(denom);
          topx = center_x*(int)+r/2*Math.cos(inbetween_angle)-font/3
          topy = center_y-2*r/3*Math.sin(inbetween_angle)


          ctx.fillStyle = "#000000";
          ctx.font = font+"px Georgia";
          ctx.fillText(1, topx, topy);
          ctx.fillText("_",topx-font/20,topy+font/20);
          ctx.fillText(denom, topx, topy+font);
      }

      // Draws the outer circle
      ctx.beginPath();
      ctx.arc(center_x*(int),center_y,r,0,2*Math.PI);
      ctx.stroke();
    } else {

      ctx.fillStyle = red;
      ctx.beginPath();
      angle = 2*Math.PI/(denom/(num - int*denom));
      ctx.moveTo(center_x*(int+1),center_y);
      ctx.lineTo(center_x*(int+1)+r,center_y);
      ctx.arc(center_x*(int+1),center_y,r,0,angle);
      ctx.lineTo(center_x*(int+1),center_y)
      ctx.fill();

      for(var i = 0; i < denom; i++)
      {
          ctx.beginPath();
          ctx.moveTo(center_x*(int+1),center_y);
          angle = i*2*Math.PI/(denom);
          ctx.lineTo(center_x*(int+1)+r*Math.cos(angle),center_y-r*Math.sin(angle));
          ctx.stroke();

          font = 40-(int)*2
          inbetween_angle = (2*i-1)/2*2*Math.PI/(denom);
          topx = center_x*(int+1)+r/2*Math.cos(inbetween_angle)-font/3
          topy = center_y-2*r/3*Math.sin(inbetween_angle)


          ctx.fillStyle = "#000000";
          ctx.font = font+"px Georgia";
          ctx.fillText(1, topx, topy);
          ctx.fillText("_",topx-font/20,topy+font/20);
          ctx.fillText(denom, topx, topy+font);
      }

      // outer Circle
      ctx.beginPath();
      ctx.arc(center_x*(int+1),center_y,r,0,2*Math.PI);
      ctx.stroke();
    }
  // }
}

function float_to_fraction (x){
   error=0.000001
    n = Math.floor(x);
    x -= n;
    if(x < error){
        return [n, 1];
      }
    else if(1 - error < x){
        return [n+1, 1];
      }

    lower_n = 0;
    lower_d = 1;
    upper_n = 1;
    upper_d = 1;

    while(true){
      middle_n = lower_n + upper_n;
      middle_d = lower_d + upper_d;
      if(middle_d * (x + error) < middle_n)
      {
        upper_n = middle_n;
        upper_d = middle_d;
      }
      else if(middle_n < (x - error) * middle_d)
      {
        lower_n = middle_n;
        lower_d = middle_d;
      }
      else{
          return [n * middle_d + middle_n, middle_d]
        }
    }
}

$("#input_denominator").on('input', function() {
	// console.log($("#input_denominator").val());
  draw_fraction($("#input_numerator").val(),$("#input_denominator").val());

  if($("#input_denominator").val() > 0 && $("#input_numerator").val() >= 0)
  {
    $("#fraction_value").val($("#input_numerator").val()/$("#input_denominator").val());
  }
});

$("#input_numerator").on('input', function() {
	// console.log($("#input_numerator").val());
  draw_fraction($("#input_numerator").val(),$("#input_denominator").val());
  if($("#input_denominator").val() > 0 && $("#input_numerator").val() >= 0)
  {
    $("#fraction_value").val($("#input_numerator").val()/$("#input_denominator").val());
  }
});

$("#fraction_value").on('input', function() {
  vals = float_to_fraction($("#fraction_value").val());
  console.log(vals);
  num = vals[0];
  den = vals[1];
  draw_fraction(num,den);
  $("#input_numerator").val(num);
  $("#input_denominator").val(den);
});

$(".whatsthis").on('click', function() {
  if($(".dropdown").hasClass('hidden'))
  {
    $(".whatsthis").html("Hide");
    $(".dropdown").removeClass('hidden');
  }
	else{
    $(".whatsthis").html("What is this?");
    $(".dropdown").addClass('hidden');
  }
});

red = "#e74c3c";
green = "#2ecc71";
blue = "#3498db";
orange = "#e67e22";
background = "#FFFFFF"

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

// $("#plot").width($("#plot").parent().width());

var newCanvas = $('<canvas/>',{'width':$('#canvasContainer').width(),'height':$('#canvasContainer').height(),'id':"plot"});
$('#canvasContainer').append(newCanvas);

var canvas = document.getElementById("plot");

let dpi = window.devicePixelRatio;

var ctx = canvas.getContext("2d");

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
}

fix_dpi();

ctx.fillStyle = background;
ctx.fillRect(0, 0, canvas.width, canvas.height);

$(document).ready(function(){
  draw_fraction(1,4);
});
