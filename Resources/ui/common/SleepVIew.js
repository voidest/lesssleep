//FirstView Component Constructor
function SleepView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%'/*,
	backgroundImage :"images/background.png"*/});
	//var flipCounter = require('flipCounter');
	//var myCounter = new flipCounter("counter", {inc: 23, pace: 500});
	var webView = Ti.UI.createWebView({
		disableBounce:true,
		scalesPageToFit:true,
	  width:'100%' ,
      height:'100%'          
    });
	/*var htmlContent = 
   		"<html>"+
 		"<head>"+
 		 "<style>"+
 		 "body{"+
 		 "margin:0;"+ 		 
 		 "}"+
 		 "</style>"+ 		 
 		 "<meta charset=\"utf-8\">"+
 		 "<link rel=\"stylesheet\" type=\"text/css\" href=\"./counter.css\"/>" +  		 
 			"<script type=\"text/javascript\" src=\"./flipcounter.js\"></script>"+
 		"<div id=\"wrapper\"><div id=\"flip-counter\" class=\"flip-counter\"></div></div>" +	
 		"</head>"+
 		"<body>"+
 		"<script type=\"text/javascript\" src=\"./SleepTimer.js\"></script>"+ 		
		 "</body>"+
		"</html>" ;  
		webView.frame = self.frame;		
		webView.scalesPageToFit = true;
	    webView.disableBounce = true;
		
		webView.html = htmlContent;*/
		webView.url = "./cdtimer.html";
		self.add(webView);
		webView.reload();
		var osname = Ti.Platform.osname;
		if (osname === 'iphone' || osname === 'ipad') {
			webView.repaint(); 
		}
	return self;
}
	
module.exports = SleepView;