var delta = 1000;

var perc = 0.8;
var width;
var height;
var centerX;
var centerY;
var updated = false;
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
var yArrowScale = 0.84;
var xArrowScale = yArrowScale * 25 / 172;
var yOffs = 13.0/172.0;
var mountFrac=2.0/172.0;
var arrowRadFrac = 1.1 / 46.0;

var ctx;
var canvas;

var watchesX;
var watchesY;
var watchesSize;

var timeIntervals = [];

var fadeInOn = 0;
var fadeOutOn = 0;

function HHMMToAngles(hh, mm)
{
	return 2 * Math.PI  * (mm + hh * 60) / (12 * 60) - Math.PI / 2;	
}

function getAngles(timeInterval, amTime)
{
  
  if(timeInterval[2] != timeInterval[5])
  {
  	if(timeInterval[2] === amTime)  	 
      return [HHMMToAngles(timeInterval[0], timeInterval[1]), 2 * Math.PI];
    else
      return [0, HHMMToAngles(timeInterval[3], timeInterval[4])];  
  }
  startAngle = HHMMToAngles(timeInterval[0], timeInterval[1]);
  endAngle   = HHMMToAngles(timeInterval[3], timeInterval[4]);
  return [startAngle, endAngle];
}

//var cx = 
function getAngles(timeInterval)
{
  startAngle = HHMMToAngles(timeInterval[0], timeInterval[1]);
  if(timeInterval[2] != timeInterval[5])
  {
    return [startAngle, 2 * Math.PI];
  }
  endAngle   = HHMMToAngles(timeInterval[3], timeInterval[4]);
  return [startAngle, endAngle];
}

function drawCanvas()
{
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();         
  var am = hours >= 12;           
  hours = hours >= 12 ? hours - 12 : hours;
  var newAngle = HHMMToAngles(hours, minutes);
  //var newAngle = (2 * Math.PI * seconds) / (60);
  var deltaAngle = angle - newAngle;
  //Ti.API.info("Received " + angle  + " " + newAngle + " new rows.");
  if(Math.abs(deltaAngle) < 2 * Math.PI / 120 && !updated)
  {
  	return;
  } 
  angle = newAngle;
  ctx.clearRect(0,0,width, height);
  ctx.drawImage(bgrImage,0,0,width, height);
  ctx.drawImage(clockBgr,watchesX,watchesY,watchesSize, watchesSize);
  
  updated = false;
    

  var watchesRad = 244;//watchesSize * (250 - 65) / 500;
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	var curr = timeIntervals[idx]; 
  	if(curr[2] != am && am != curr[5])
  	  continue;
  	var angles = getAngles(timeIntervals[idx], am);
    var begAngle = angles[1];
    var endAngle = angles[0];
    //Ti.API.info("" + angles + " new rows.");
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); 
    ctx.lineTo(centerX + watchesRad * Math.cos(begAngle), centerY + watchesRad * Math.sin(begAngle));   
     
    ctx.arc(centerX, centerY, watchesRad,begAngle,endAngle, true);
    ctx.moveTo(centerX + watchesRad * Math.cos(endAngle), centerY + watchesRad * Math.sin(endAngle));
    ctx.lineTo(centerX, centerY);  
    ctx.fillStyle = '#abaaa7';//radialgradient; 
    ctx.fill();    
  }
  ctx.drawImage(ticksImg,watchesX,watchesY,watchesSize, watchesSize);
   
  var arrowLen = 194;//watchesRad * yArrowScale;
  var arrW = 8;
  ctx.save();
  //ctx.translate(3,3);
  ctx.shadowColor = "rgba(135,135,135,15)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.beginPath();  
  var arrBSize = 16;//watchesSize * arrowRadFrac;
  ctx.arc(centerX, centerY, arrBSize, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(155,155,155,1)";
  ctx.fill();
  
  ctx.lineWidth = arrW;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
  ctx.strokeStyle = "rgba(155,155,155,1)";
  ctx.stroke();
  ctx.restore();
   
  
  ctx.beginPath();  
  ctx.arc(centerX, centerY, arrBSize, 0, Math.PI * 2);
  ctx.fillStyle = "#E10A1B";
  ctx.fill();
  
  ctx.lineWidth = arrW;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
  ctx.strokeStyle = "#E10A1B";
  ctx.stroke();
  
  var mountHalf = mountFrac * watchesSize;
  
  ctx.drawImage(mountImg,centerX - mountHalf, centerY - mountHalf, 2 * mountHalf, 2 * mountHalf);

  /*ctx.fillStyle = "#494d56";
  ctx.font = "bold 26pt Helvetica Neue ";
  var dgtC = 1.03;
  var symbolH = watchesSize / 18;
  var symbolW = watchesSize / 25;
  ctx.fillText("12", centerX - symbolW, centerY - dgtC * watchesRad);
  ctx.fillText("3", centerX + dgtC * watchesRad, centerY + symbolH / 2);
  ctx.fillText("6", centerX - symbolW / 2, centerY + dgtC * watchesRad + symbolH);
  ctx.fillText("9", centerX - dgtC * watchesRad - symbolW, centerY + symbolH / 2 );*/
}


function setIntervals(inIntervals)
{
	
  timeIntervals = inIntervals;
  //alert("dadsa " + timeIntervals.length + " " + timeIntervals);
}

function update()
{
 //angle += angleSpeed * delta;
 drawCanvas();
}


window.onload = function() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
     

    width = canvas.width;
    height = canvas.height;
     
    
    //watchesSize = (width > height ? height : width) * perc;
    watchesSize = 640;
    watchesX = 0;(width - watchesSize) / 2;
    watchesY = (height - watchesSize) / 2;
    centerX = watchesX + watchesSize / 2;
    centerY = watchesY + watchesSize / 2;

     //images 
    bgrImage = new Image();
    bgrImage.src = './images/cream-bg@2x.png';

    clockBgr = new Image();
    clockBgr.src = './images/clock-down@2x.png';

    ticksImg = new Image();
    ticksImg.src = './images/clock-up@2x.png';

  //  arrowImg = new Image();
  //  arrowImg.src = './images/arrow.png';

   // glassImg = new Image();
   // glassImg.src = './images/clock-glace.png';

    mountImg = new Image();
    mountImg.src = './images/mount@2x.png';
 /*   var date = new Date();
  	var hours = date.getHours();
  	var minutes = date.getMinutes();
  	var seconds = date.getSeconds();                    
  	hours = hours > 12 ? hours - 12 : hours;
    //angle = (hours + minutes * 60) / (12 * 60);
    angle = HHMMToAngles(hours, minutes) + Math.PI / 2;*/
    //angle = (2 * Math.PI * seconds) / (60);
    
    Ti.App.addEventListener("web:data", function (event) {
    	timeIntervals = event.data;
    	updated = true;
    	//Ti.API.info("" + timeIntervals);
    //	Ti.API.info("Received " + timeIntervals + " new rows.");
    });
    
    //Ti.App.fireEvent('helloWorld', { data : escape("Hello World") } );
   // img.load();

     setInterval(update, delta);
}