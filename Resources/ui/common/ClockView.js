//FirstView Component Constructor
var sleepIntervals = [];


function ClockView(myWidth, myHeight) {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:myWidth, bottom: '184px'});
	var webView = Ti.UI.createWebView({
		disableBounce:true,
		scalesPageToFit:true,backgroundColor : '#f3f3f3',   
	  width:'100%' ,
      height:'100%'          
    });
    
     
   /* Ti.App.addEventListener('helloWorld', function(passedData) 
	{
    	// Pass data to the webView
    	//webView.evalJS("alert(unescape('"+passedData.data+"'))");
    	alert(passedData.data);
	});*/
    var first = Boolean(true);
    //var firstLoad = Boolean(true);
    
    self.addEventListener('postlayout',function(e)
	{
		var w = self.size.width;
		var h = self.size.height;
		var currH = Ti.Platform.displayCaps.platformHeight * 0.6;
		//webView.reload();
		//webView.repaint(); 
		if(h < 276)
		{
			return;
		}
		Ti.API.info("Received " + w + " " + h + " new rows." + Ti.Platform.displayCaps.platformHeight);
		if(!first)
		{
			self.visible = true;
			return;
		}
		first = Boolean(false);
		
		//webView.width = w;
		//webView.height = h;
   		var htmlContent = 
   		"<html>"+
 		"<head>"+
 		 "<title>canvas</title>"+
 		 "<meta name=\"viewport\" content =\"width=" + 2 * w + ", height=" + 2 * h + ", user-scalable=no\"/>"+
 		 "<style>"+
 		 "body{"+
 		 "margin:0;"+ 		 
 		 "}"+
 		 "</style>"+ 		 
 		 "<meta charset=\"utf-8\">"+
 			"<script type=\"text/javascript\" src=\"./ClockWidget.js\"></script>"+
 		"</head>"+
 		"<body>"+
 		 "<canvas id=\"canvas\" width=\"" + w*2 + "\" height=\"" + h*2 + "\">"+
 		   "<p>Lol</p>"+
 		 "</canvas>"+
		 "</body>"+
		"</html>" ;  
		webView.frame = self.frame;		
		webView.scalesPageToFit = true;
	    webView.disableBounce = true;
		
		webView.html = htmlContent;
		webView.scalesPageToFit = true;
	    webView.disableBounce = true;
	    self.add(webView);
		webView.reload();
		webView.scalesPageToFit = true;
	    webView.disableBounce = true;
		var osname = Ti.Platform.osname;
		if (osname === 'iphone' || osname === 'ipad') {
			webView.repaint(); 
		}
		//sleepIntervals.push({hhs: 10, mms : 50, pms : true, hhe : 11, mme : 50, pme : true});
		//sleepIntervals.push({hhs: 4, mms : 30, pms : true, hhe : 5, mme : 30, pme : true});
		//sleepIntervals.push({hhs: 6, mms : 20, pms : true, hhe : 8, mme : 30, pme : true});
		//webView.evalJS("setIntervals1();");
		sleepIntervals.push([10, 50, 1, 11, 50, 1]);
		sleepIntervals.push([ 4, 30, 1,  5, 30, 1]);
		sleepIntervals.push([ 6, 20, 1,  8, 30, 1]);
		
		webView.addEventListener('load', function(e) {
			/*if(!firstLoad)
			  return;
			firstLoad = Boolean(false);*/
			//alert(sleepIntervals);
			//webView.evalJS("setIntervals('" + sleepIntervals + "');");  
			Ti.App.fireEvent("web:data", {data: sleepIntervals});
			webView.frame = self.frame;	
		
			webView.disableBounce = true;
		});
		webView.touchEnabled = true;	
		
	});	
/*	var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;
 
 	var perc = 70;
    if (pWidth > pHeight) {
      self.height = perc + '%';
      self.width = perc * pHeight / pWidth + '%';
      self.top = (100-perc) / 2 + '%';
      self.left = (100-perc) * pHeight / (2 * pWidth) + '%';
    } else {
      self.width = perc + '%';
      var val = perc * pWidth / pHeight;
      self.height = perc * pWidth / pHeight + '%';
      self.left = (100-perc) / 2 + '%';
      self.top = (100-perc * pWidth / pHeight) / 2 + '%';    
    }*/
    /*var first = Boolean(true);
    var ticks = Titanium.UI.createView({width:'100%', height:'100%', backgroundImage: "images/clock-labels.png"});
	self.add(ticks);
	//self.visible = false;
	var angle = 6;
	var t3 = Ti.UI.create2DMatrix();
		t3 = t3.rotate(angle);
		
		
	
		var a = Titanium.UI.createAnimation();
		a.transform = t3;
		a.duration = 1;
		a.autoreverse = false;
		a.repeat = 100000000;
		a.addEventListener('complete', function(e) {
			angle += 6;
           t3 = t3.rotate(angle);
         a.transform = t3;
         ticks.animate(spin);
        });
	
    self.addEventListener('postlayout',function(e)
	{
		if(!first)
		{
			self.visible = true;
			return;
		}
		first = Boolean(false);
		var perc = 0.7;
		var w = self.size.width;
		var h = self.size.height;
   		var size = (w > h ? h : w) * perc;
   		self.top = (h - size) / 2;
   		self.left = (w - size) / 2;
   		self.width = size;
   		self.height = size;
   		//self.visible = true;
   		//ticks.animate(a);
   		
   		
	});	
	var tt = 10;
	setInterval(function(e) {
    var a = Titanium.UI.createAnimation();
    a.transform = t;
    a.duration = 1000;
    var t = Ti.UI.create2DMatrix();
    t = t.rotate(tt);
    a.transform = t;
    tt = tt + 10;
    ticks.animate(a);
}, 1000);
	
	var button = Titanium.UI.createButton({
    title: 'Hello',
   top: 0,
   width: '100%',
   height: '100%'
	});
	
	
	
	
	button.addEventListener('click',function(e)
	{
   		alert('The file has been deleted');
	});	
	//self.add(button);*/
		
	return self;
}

module.exports = ClockView;


