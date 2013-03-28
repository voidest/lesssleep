var delta = 1000;

var perc = 0.8;
var width;
var height;
var centerX;
var centerY;
//images
var bgrImage;
var clockBgr;
var ticksImg;
var arrowImg;
//var glassImg;
var mountImg;
//tmp
var angleSpeed = 6.0 / (2.0 * /*4.0 **/ delta);
var angle = 0;
 //arrow
//var xArrowScale = 0.001;
var yArrowScale = 0.79;
var xArrowScale = yArrowScale * 25 / 172;
var yOffs = 13.0/172.0;
var mountFrac=2.0/172.0;
var arrowRadFrac = 1.3 / 46.0;

var ctx;
var canvas;

var watchesX;
var watchesY;
var watchesSize;

var timeIntervals = [];



//var cx = 
function getAngles(timeInterval)
{
  startAngle = 2 * Math.PI  * (timeInterval[1] + timeInterval[0] * 60) / (12 * 60);
  if(timeInterval[2] != timeInterval[5])
  {
    return [startAngle, 2 * Math.PI];
  }
  endAngle   = 2 * Math.PI  * (timeInterval[4] + timeInterval[3] * 60) / (12 * 60);
  return [startAngle, endAngle];
}

function drawCanvas()
{
// ctx.clearRect(0,0,width, height);
  ctx.drawImage(bgrImage,0,0,width, height);
  ctx.drawImage(clockBgr,watchesX,watchesY,watchesSize, watchesSize);
  
    

 var watchesRad = watchesSize * (250 - 45) / 500;
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	//Ti.API.info("" + timeIntervals[0] + " new rows.");
  	//Ti.API.info("" + currInt + " new rows.");
    ctx.beginPath();
    var angles = getAngles(timeIntervals[idx]);
    var begAngle = angles[1];
    var endAngle = angles[0];
    //Ti.API.info("" + angles + " new rows.");
   
    ctx.moveTo(centerX, centerY);  
    ctx.moveTo(centerX + watchesRad * Math.cos(endAngle), centerY + watchesRad * Math.sin(endAngle)); 
    ctx.arc(centerX, centerY, watchesRad,begAngle,endAngle, true);
    ctx.lineTo(centerX + watchesRad * Math.cos(begAngle), centerY + watchesRad * Math.sin(begAngle));  
    ctx.lineTo(centerX, centerY);  
    ctx.fillStyle = '#e5837f';//radialgradient; 
    ctx.fill();  
  }
  
  /*var radialgradient = ctx.createRadialGradient(centerX, centerY,0,centerX, centerY, watchesRad); 
  radialgradient.addColorStop(0  ,'rgba(16,192,247,255)');
  radialgradient.addColorStop(0.5,'rgba(0,145,230,255)');
  radialgradient.addColorStop(1  ,'rgba(119,182,236,255)');*/

  
  





  //ctx.save();  
  //ctx.save();  
  
  /*  ctx.shadowColor = "rgba(155,155,155,127)";
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;*/
  
   var arrowLen = watchesRad * yArrowScale;
   ctx.save();
   //ctx.translate(3,3);
   ctx.shadowColor = "rgba(75,75,75,75)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.beginPath();  
  ctx.arc(centerX, centerY, watchesSize * arrowRadFrac, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(155,155,155,1)";
  ctx.fill();
  
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle * Math.PI / 180), centerY + arrowLen * Math.sin(angle * Math.PI / 180));
  ctx.strokeStyle = "rgba(155,155,155,1)";
  ctx.stroke();
  ctx.restore();
   
  
  ctx.beginPath();  
  ctx.arc(centerX, centerY, watchesSize * arrowRadFrac, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(206,23,23)";
  ctx.fill();
  
  //Ti.App.fireEvent('helloWorld', { data : escape("Hello World!!!") } );
  
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle * Math.PI / 180), centerY + arrowLen * Math.sin(angle * Math.PI / 180));
  ctx.strokeStyle = "rgb(206,23,23)";
  ctx.stroke();
  
  //ctx.restore();
   
  
  //ctx.drawImage(arrowImg, -watchesSize * xArrowScale / 4,  -watchesSize * yArrowScale * yOffs / 2 , watchesSize * xArrowScale / 2, watchesSize * yArrowScale / 2);
  

  var mountHalf = mountFrac * watchesSize;
 // ctx.drawImage(glassImg,watchesX,watchesY,watchesSize, watchesSize);
  ctx.drawImage(ticksImg,watchesX,watchesY,watchesSize, watchesSize);
  ctx.drawImage(mountImg,centerX - mountHalf, centerY - mountHalf, 2 * mountHalf, 2 * mountHalf);

  ctx.fillStyle = "#494d56";
  ctx.font = "bold 26pt Helvetica Neue ";
  var dgtC = 1.03;
  var symbolH = watchesSize / 18;
  var symbolW = watchesSize / 25;
  ctx.fillText("12", centerX - symbolW, centerY - dgtC * watchesRad);
  ctx.fillText("3", centerX + dgtC * watchesRad/* + symbolW*/, centerY + symbolH / 2);
  ctx.fillText("6", centerX - symbolW / 2, centerY + dgtC * watchesRad + symbolH);
  ctx.fillText("9", centerX - dgtC * watchesRad - symbolW, centerY + symbolH / 2 );
	
}


function setIntervals(inIntervals)
{
	
  timeIntervals = inIntervals;
  //alert("dadsa " + timeIntervals.length + " " + timeIntervals);
}

function update()
{
 angle += angleSpeed * delta;
 drawCanvas();
}


window.onload = function() {

    canvas = document.getElementById('canvas');
    //if(!drawingCanvas or !drawingCanvas.getContext('2d'))
//	return;
    ctx = canvas.getContext('2d');

     width = canvas.width;
     height = canvas.height;
    centerX = width / 2;
    centerY = height / 2;
    watchesSize = (width > height ? height : width) * perc;
    watchesX = (width - watchesSize) / 2;
    watchesY = (height - watchesSize) / 2;

     //images 
    bgrImage = new Image();
    bgrImage.src = './images/background.png';

    clockBgr = new Image();
    clockBgr.src = './images/clock-bg.png';

    ticksImg = new Image();
    ticksImg.src = './images/clock-labels.png';

    arrowImg = new Image();
    arrowImg.src = './images/arrow.png';

   // glassImg = new Image();
   // glassImg.src = './images/clock-glace.png';

    mountImg = new Image();
    mountImg.src = './images/mount.png';
    
    Ti.App.addEventListener("web:data", function (event) {
    	timeIntervals = event.data;
    	//alert("" + timeIntervals[0]);
    //	Ti.API.info("Received " + timeIntervals + " new rows.");
    });
    
    //Ti.App.fireEvent('helloWorld', { data : escape("Hello World") } );
   // img.load();

     setInterval(update, delta);
   }