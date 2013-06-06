
var delta = 40;
var animTimeMs = 500;//0,3sec
var fps = 1000 / delta;
var deltaOp = delta / animTimeMs;//1.0 / fps;//Math.floor(255 / fps);
var opAcc = deltaOp * 0.1;
var perc = 0.8;
var width;
var height;
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
var yArrowScale = 0.79;
var xArrowScale = yArrowScale * 25 / 172;
var yOffs = 13.0/172.0;
var mountFrac=4.0/172.0;
var arrowRadFrac = 2.2 / 46.0;

var ctx;
var canvas;



var timeIntervals = [];
var states = [];
var ops = [];
var opsSpeeds = [];

var watchesData = [];

var fadeInOn = 0;
var fadeOutOn = 0;

function HHMMToAngles(hh, mm)
{
	return 2 * Math.PI  * (mm + hh * 60) / (12 * 60) - Math.PI / 2;	
}

//var cx = 
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

function drawWatches(wData, drawArrow, angle, amTime)
{
  var watchesX = wData.x;
  var watchesY = wData.y;
  var watchesSize = wData.size; 
  var centerX = watchesX + watchesSize / 2;
  var centerY = watchesY + 2 +  watchesSize / 2;
  //Ti.API.info("Inc" + centerX + "  " + centerY);
  ctx.drawImage(clockBgr,watchesX,watchesY,watchesSize, watchesSize);  

  var watchesRad = /*watchesSize * (250 - 18) / 500*/73;
  var hasFadeOut = false;
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	if(states[idx] === -1){
  		hasFadeOut = true;
  		break;
  	}
  }
  
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	var angles = getAngles(timeIntervals[idx], amTime);
  	var curr = timeIntervals[idx]; 
  	var opacity = 0;
  	if(states[idx] === 1){
  		opacity = 1.0;
  	}
  	else{
  		opacity = ops[idx];
  	}
  	if(curr[2] != amTime && amTime != curr[5])
  	  continue;
  	var begAngle = angles[1];
    var endAngle = angles[0];
     ctx.beginPath();
     ctx.lineWidth = 1;
    ctx.moveTo(centerX, centerY); 
    ctx.lineTo(centerX + Math.floor(watchesRad * Math.cos(begAngle)), centerY + Math.floor(watchesRad * Math.sin(begAngle)));   
     
    ctx.arc(centerX, centerY, watchesRad,begAngle,endAngle, true);
    ctx.moveTo(centerX + Math.floor(watchesRad * Math.cos(endAngle)), centerY + Math.floor(watchesRad * Math.sin(endAngle)));
    ctx.lineTo(centerX, centerY);  
    ctx.fillStyle = 'rgba(153,178,191, ' + opacity + ')';//'#6db1d4';
    ctx.fill();  
    
    if(states[idx] === 0 && !hasFadeOut){
    	ops[idx] += opsSpeeds[idx];
    	opsSpeeds[idx] += opAcc;
    	if(ops[idx] >= 1.0){
    		ops[idx] = 1.0;
    		states[idx] = 1;
    	}
    }  
    if(states[idx] === -1){
    	ops[idx] -= opsSpeeds[idx];
    	opsSpeeds[idx] += opAcc; 
    	if(ops[idx] < 0.1){
    		ops[idx] = 0;
    		states[idx] = -2;
    	}
    }  
    
    
    
  }
  ctx.drawImage(!amTime ? ticksImg1 : ticksImg2, watchesX,watchesY,watchesSize + 1, watchesSize);
 
  if(drawArrow) 
  {
    var arrowLen = watchesRad * yArrowScale;
    ctx.save();
    //ctx.translate(3,3);
    ctx.shadowColor = "rgba(135,135,135,15)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();  
    ctx.arc(centerX, centerY, watchesSize * arrowRadFrac, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(155,155,155,1)";
    ctx.fill();
    
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
    ctx.strokeStyle = "rgba(155,155,155,1)";
    ctx.stroke();
    ctx.restore();
     
    
    ctx.beginPath();  
    ctx.arc(centerX, centerY, watchesSize * arrowRadFrac, 0, Math.PI * 2);
    ctx.fillStyle = "#E10A1B";
    ctx.fill();
    
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + arrowLen * Math.cos(angle), centerY + arrowLen * Math.sin(angle));
    ctx.strokeStyle = "#E10A1B";
    ctx.stroke();
  }
  
  
  var mountHalf = 4;//mountFrac * watchesSize;
  
  ctx.drawImage(mountImg,centerX - mountHalf, centerY - mountHalf, 2 * mountHalf, 2 * mountHalf);

  
}

function drawCanvas()
{
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();                    
  var am = hours < 12;
  hours = hours >= 12 ? hours - 12 : hours;
  var newAngle = HHMMToAngles(hours, minutes);
  var onAnim = false;
  for(var idx = 0; idx < timeIntervals.length; ++idx)
  {
  	if(states[idx] != 1 && states[idx] != -2){
  		onAnim = true;
  		break;
  	}
  }
  //var newAngle = (2 * Math.PI * seconds) / (60);
  var deltaAngle = angle - newAngle;
  //Ti.API.info("Received " + angle  + " " + newAngle + " new rows.");
  /*if(Math.abs(deltaAngle) < 2 * Math.PI / 120 && !onAnim)
  {
  	return;
  } */
  angle = newAngle;
  ctx.clearRect(0,0,width, height);
  //ctx.drawImage(bgrImage,0,0,width, height);
  drawWatches(watchesData[0], am, angle, 0);
  drawWatches(watchesData[1], !am, angle, 1);
  
 /* 
  ctx.fillStyle = "#494d56";
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
    //Ti.API.info(width + '+ ' + height);
    /*centerX = width / 2;
    centerY = height / 2;
    watchesSize = (width > height ? height : width) * perc;
    watchesX = (width - watchesSize) / 2;
    watchesY = (height - watchesSize) / 2;*/
    /*var leftPerc = 0.00;
    var leftW = {
        x: width * leftPerc,
        y: width * leftPerc,
        size: width * (0.5 - 2 * leftPerc)
    };
    watchesData.push(leftW);   
    var rightW = {
        x: width * (0.5 + leftPerc) + 15,
        y: width * leftPerc,
        size: width * (0.5 - 2 * leftPerc)
    };*/
   var h  =150;
   var leftW = {
        x: 1,
        y: 1,
        size: h
    };
    watchesData.push(leftW);   
    var rightW = {
        x: h + 30,
        y: 1,
        size: h
    };
    //Ti.API.info(height, width);
    watchesData.push(rightW);   
    //Ti.API.info(watchesData);
    //images 
    //bgrImage = new Image();
    //bgrImage.src = './images/background.png';

    clockBgr = new Image();
    clockBgr.src = './images/clock-small-down@2x.png';

    ticksImg1 = new Image();
    ticksImg1.src = './images/clock-small-1st-up@2x.png';
    
    ticksImg2 = new Image();
    ticksImg2.src = './images/clock-small-2nd-up@2x.png';

    //arrowImg = new Image();
    //arrowImg.src = './images/arrow.png';

   // glassImg = new Image();
   // glassImg.src = './images/clock-glace.png';

    mountImg = new Image();
    mountImg.src = './images/mount@2x.png';
    var date = new Date();
  	var hours = date.getHours();
  	var minutes = date.getMinutes();
  	var seconds = date.getSeconds();                    
  	hours = hours > 12 ? hours - 12 : hours;
    //angle = (hours + minutes * 60) / (12 * 60);
    angle = HHMMToAngles(hours, minutes) + Math.PI / 2;
    //angle = (2 * Math.PI * seconds) / (60);
    
    Ti.App.addEventListener("web:data1", function (event) {
    	timeIntervals = event.data;
    	states = event.states;
    	ops = [];
    	opsSpeeds = [];
    	for(var idx = 0; idx < timeIntervals.length; ++idx)
		  {
		  	var o = 0;
		  	if(states[idx] === -1){
		  		o = 1.0;		  		
		  	}
		  	if(states[idx] === 0){
		  		o = 0;
		  	}
		  	ops.push(o);
		  	opsSpeeds.push(deltaOp);
		  }
		updated = true;  
    	//alert("" + timeIntervals[0]);
    });
    
    //Ti.App.fireEvent('helloWorld', { data : escape("Hello World") } );
   // img.load();

     setInterval(update, delta);
}