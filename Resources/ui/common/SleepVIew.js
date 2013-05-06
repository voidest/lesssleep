//FirstView Component Constructor
function SleepView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%'/*,
	backgroundImage :"images/background.png"}*/});
	//var flipCounter = require('flipCounter');
	//var myCounter = new flipCounter("counter", {inc: 23, pace: 500});
	var webView = Ti.UI.createWebView({
		disableBounce:true,
		scalesPageToFit:true,url : "./cdtimer.html",
		touchEnabled:false,
		top:'45%',
	  left : '20%',	
	  width:'384px' ,
      height:'150px'          
    });
	//webView.url = "./cdtimer.html";
	
	webView.scalesPageToFit = true;
	    webView.disableBounce = true;
	self.add(webView);
	webView.reload();
	var osname = Ti.Platform.osname;
	if (osname === 'iphone' || osname === 'ipad') {
		webView.repaint(); 
	}
	var topView = Ti.UI.createView({top : '0%', width:'100%', height:'396px', backgroundImage :"images/moon.png"});
	
	self.add(topView);
	
	//var timerView = Ti.UI.createView({top : '396px', width:'100%', height:'30%'});
	//timerView.add(webView);
	//self.add(timerView);
	
	var botView = Ti.UI.createView({top : '60%', width:'100%', height:'30%'});
	
	var buttonWake = Titanium.UI.createButton({
   		title: L('wake_up_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-red.png',
   		backgroundSelectedImage:'./images/button-red-active.png',
   		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:'5%',
   		width: '42%',
   		height: '25%'
		});
	var buttonChng = Titanium.UI.createButton({
   		title: L('edit_skip_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-red.png',
   		backgroundSelectedImage:'./images/button-red-active.png',
   		font:{fontSize:24,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:'53%',
   		width: '42%',
   		height: '25%'
		});	
	buttonWake.addEventListener('click', function(e)
	{
		alert('kal');
		var date = new Date (); 
		var notification = Ti.App.iOS.scheduleLocalNotification (
			{ alertBody: "Kitchen Sink was put in background", 
			alertAction: "Re-Launch!", 
			userInfo: {"hello": "world"}, 
			sound: "pop.caf", 
			date: new Date (new Date (). getTime () + 5000) });
	})
	botView.add(buttonWake);
	botView.add(buttonChng);
	self.add(botView);	
	return self;
}
	
module.exports = SleepView;
