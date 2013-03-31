var HoursCounter;
var MinCounter;
var SecCounter;
var hh = 12;
	var mm = 35;
	var ss = 59; 

function update()
{
	Ti.API.info("Received  new rows.");
	//return;
 //angle += angleSpeed * delta;
 //drawCanvas();
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  Ti.API.info("Received  new rows." + hours + " " + minutes + " " + seconds);
  //var currSecs = 0;
  //var sleepSecs = 0;
  var totalSecs = 0;   
  if(hours > hh)//assume that this is new day
  {
  	var sleepSecs = hh * 3600 + mm * 60 + ss;
  	var currSecs = 12 * 3600 - (hours * 3600 + minutes * 60 + seconds);
  	totalSecs = sleepSecs + currSecs;  	  	
  }
  else
  {
  	totalSecs = (hh - hours) * 3600 + (mm - minutes) * 60 + ss - seconds;
  }
  var sss = totalSecs % 60;
  var mmm = ((totalSecs - sss) / 60) % 60;
  var hhh = (((totalSecs - sss) / 60) - mmm) /  60;
  Ti.API.info("Received  new rows." + hhh + " " + mmm + " " + sss);
  //return;
  HoursCounter.setValue(hhh);
  MinCounter.setValue(mmm);
  SecCounter.setValue(sss);     
}


window.onload = function() {
	//Ti.API.info("Received  new rows.");
	


	SecCounter = new flipCounter('flip-counter', {value:ss, inc:-1, pace:1000, auto:false});
	MinCounter = new flipCounter('flip-counter', {value:mm, inc:-1, pace:1000, auto:false});	
	HoursCounter = new flipCounter('flip-counter', {value:hh, inc:-1, pace:1000, auto:false});
	update();	
	update();
	//setInterval(update, 1000);
}
