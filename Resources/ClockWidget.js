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
var yArrowScale = 0.84;
var xArrowScale = yArrowScale * 25 / 172;
var yOffs = 13.0/172.0;
var mountFrac=2.0/172.0;
var arrowRadFrac = 0.9 / 46.0;

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
  hours = hours >= 12 ? hours - 12 : hours;
  var newAngle = HHMMToAngles(hours, minutes);
  //var newAngle = (2 * Math.PI * seconds) / (60);
  var deltaAngle = angle - newAngle;
  //Ti.API.info("Received " + angle  + " " + newAngle + " new rows.");
  if(Math.abs(deltaAngle) < 2 * Math.PI / 120 && fadeInOn === 0 && fadeOutOn === 0)
  {
  	return;
  } 
  angle = newAngle;
  ctx.drawImage(bgrImage,0,0,width, height);
  ctx.drawImage(clockBgr,watchesX,watchesY,watchesSize, watchesSize);
  
  
    

  var watchesRad = watchesSize * (250 - 65) / 500;
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	var angles = getAngles(timeIntervals[idx]);
    var begAngle = angles[1];
    var endAngle = angles[0];
    //Ti.API.info("" + angles + " new rows.");
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);  
    ctx.moveTo(centerX + watchesRad * Math.cos(endAngle), centerY + watchesRad * Math.sin(endAngle)); 
    ctx.arc(centerX, centerY, watchesRad,begAngle,endAngle, true);
    ctx.lineTo(centerX + watchesRad * Math.cos(begAngle), centerY + watchesRad * Math.sin(begAngle));  
    ctx.lineTo(centerX, centerY);  
    ctx.fillStyle = '#e5837f';//radialgradient; 
    ctx.fill();    
  }
  ctx.drawImage(ticksImg,watchesX,watchesY,watchesSize, watchesSize);
   
  var arrowLen = watchesRad * yArrowScale;
  var arrW = 5;
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
  
  ctx.lineWidth = arrW;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
  ctx.strokeStyle = "rgba(155,155,155,1)";
  ctx.stroke();
  ctx.restore();
   
  
  ctx.beginPath();  
  ctx.arc(centerX, centerY, watchesSize * arrowRadFrac, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(206,23,23)";
  ctx.fill();
  
  ctx.lineWidth = arrW;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
  ctx.strokeStyle = "rgb(206,23,23)";
  ctx.stroke();
  
  var mountHalf = mountFrac * watchesSize;
  
  ctx.drawImage(mountImg,centerX - mountHalf, centerY - mountHalf + 1, 2 * mountHalf, 2 * mountHalf);

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
     
    centerX = width / 2;
    centerY = height / 2;
    watchesSize = (width > height ? height : width) * perc;
    watchesX = (width - watchesSize) / 2;
    watchesY = (height - watchesSize) / 2;

     //images 
    bgrImage = new Image();
    bgrImage.src = './images/background.png';

    clockBgr = new Image();
    clockBgr.src = './images/clock-down@2x.png';

    ticksImg = new Image();
    ticksImg.src = './images/clock-up@2x.png';

  //  arrowImg = new Image();
  //  arrowImg.src = './images/arrow.png';

   // glassImg = new Image();
   // glassImg.src = './images/clock-glace.png';

    mountImg = new Image();
    mountImg.src = './images/mount.png';
    var date = new Date();
  	var hours = date.getHours();
  	var minutes = date.getMinutes();
  	var seconds = date.getSeconds();                    
  	hours = hours > 12 ? hours - 12 : hours;
    //angle = (hours + minutes * 60) / (12 * 60);
    angle = HHMMToAngles(hours, minutes) + Math.PI / 2;
    //angle = (2 * Math.PI * seconds) / (60);
    
    Ti.App.addEventListener("web:data", function (event) {
    	timeIntervals = event.data;
    	//alert("" + timeIntervals[0]);
    //	Ti.API.info("Received " + timeIntervals + " new rows.");
    });
    
    //Ti.App.fireEvent('helloWorld', { data : escape("Hello World") } );
   // img.load();

     setInterval(update, delta);
}