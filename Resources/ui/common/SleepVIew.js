//FirstView Component Constructor
function SleepView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%',
	backgroundImage :"images/cream-bg.png"});
	//var flipCounter = require('flipCounter');
	//var myCounter = new flipCounter("counter", {inc: 23, pace: 500});
	var webView = Ti.UI.createWebView({
		disableBounce:true,
		scalesPageToFit:true,url : "./cdtimer.html",
		touchEnabled:false,
		top:'480px',
	  left : '20%',	
	  width:'384px' ,
      height:'150px', backgroundColor : 'transparent'          
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
	var sideOffset = '31px';
	
	//var timerView = Ti.UI.createView({top : '396px', width:'100%', height:'30%'});
	//timerView.add(webView);
	//self.add(timerView);
	
	//var botView = Ti.UI.createView({top : '60%', width:'100%', height:'40%'});
	var buttonMusic = Titanium.UI.createButton({
   		//title: L('wake_up_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/alarm-bg.png',
   		backgroundSelectedImage:'./images/alarm-bg-pressed.png',
   		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:sideOffset,
   		right:sideOffset,
   		bottom :'276px',height : '92px'
		});
	var labelSoundCaption = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'Alarm sound',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		bottom :'300px',
  		left: '10%',
  		
	});

   var labelSoundName = Ti.UI.createLabel({
 		color: '#494d56',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'Insanity',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  		bottom :'300px',
  		left: '10%',
  		width:'75%'
  		
	});
	
	var buttonWake = Titanium.UI.createButton({
   		//title: L('wake_up_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-wakeup.png',
   		backgroundSelectedImage:'./images/button-wakeup-pressed.png',
   		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:sideOffset,
   		bottom :'140px',
   		width: '269px',
   		height: '92px'
		});
	var buttonChng = Titanium.UI.createButton({
   		//title: L('edit_skip_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-edit.png',
   		backgroundSelectedImage:'./images/button-edit-pressed.png',
   		font:{fontSize:24,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		right:sideOffset,
   		bottom :'140px',
   		width: '269px',
   		height: '92px'
		});	
	buttonWake.addEventListener('click', function(e)
	{
		/*alert('kal');
		var date = new Date (); 
		var notification = Ti.App.iOS.scheduleLocalNotification (
			{ alertBody: "Kitchen Sink was put in background", 
			alertAction: "Re-Launch!", 
			userInfo: {"hello": "world"}, 
			sound: "pop.caf", 
			date: new Date (new Date (). getTime () + 5000) });*/
			Ti.App.fireEvent("wakeButtonPressed", {data: "sleepIntervals"});
	});
	self.add(buttonMusic);
	self.add(labelSoundCaption);
	self.add(labelSoundName);
	self.add(buttonWake);
	self.add(buttonChng);
	//self.add(botView);	
	return self;
}
	
module.exports = SleepView;
