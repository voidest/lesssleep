//FirstView Component Constructor
function MainView(parentRect) {
	Ti.App.Properties.setString('SETTING_LANGUAGE', 'en');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%'/*,
	backgroundImage :"images/background.png"*/});
	
	var h = parentRect;
	/*var size = min(parentWidth, parentHeight) * 0.8;
	self.width = self.height = size;
	self.top = (parentHeight - size) / 2;
	self.left = (parentWidth - size) / 2;*/
	//self.repaint();
	//self.layout = 'vertical';
	var ClockView = require('ui/common/ClockView');
	var clockHeight = 'auto';// "" + (Ti.Platform.displayCaps.platformHeight * 2 - 184) + "px";
	clockView = new ClockView('100%', clockHeight);
	
	var panelView = Ti.UI.createView({width:'100%', height:'184px', bottom: '0px', backgroundImage:'./images/gray-bg.png'});
	
	//panelView.layout = 'horizontal';
	self.add(clockView);
	self.add(panelView);
	var sideOffset = '31px';
	var top1Offset = '22px';
	var top2Offset = '59px';
	var top21Offset = '99px';
	var top22Offset = '135px';
	
	
	
	
	var labelTimer1 = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'13:00',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: top1Offset,
  		left: sideOffset,
  		//width: '90%', height: '25%'
	});
	panelView.add(labelTimer1);
	
	var labelSleepTime = Ti.UI.createLabel({
 		color: '#494d56',
  		font:{fontSize:10,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'Next nap',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: top2Offset,
  		left: sideOffset,
  		//width: '90%', height: '8%'
	});
	panelView.add(labelSleepTime);
	
	var labelTimer2 = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'01:40:13',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: top21Offset,
  		left: sideOffset,
  		//width: '90%', height: '25%'
	});
	panelView.add(labelTimer2);
	
	var labelSleepLeft = Ti.UI.createLabel({
 		color: '#494d56',
  		font:{fontSize:10,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'Time left',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: top22Offset,
  		left: sideOffset,
  		//width: '90%', height: '8%'
	});
	panelView.add(labelSleepLeft);
	
	
	//var buttonView = Ti.UI.createView({width:'40%', height:'100%'});
	
	var button = Titanium.UI.createButton({
   		//title: L('sleep_btn_txt'),
   		right:sideOffset,
   		width:'122px',
   		height:'60px',
   		//width: '60%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-sleep.png',
   		backgroundSelectedImage:'./images/button-sleep-pressed.png',
   		//font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		//height: '35%'
		});
	button.addEventListener('click',function(e)
	{
   		Ti.App.fireEvent("sleepButtonPressed", {data: "sleepIntervals"});
	});
	/*button.add(Ti.UI.createLabel({
    	text: L('sleep_btn_txt'),
    	color: 'red',
    	shadowColor: '#50000000',
    	shadowOffset: {x:0,y:-1},
    	width: 'auto',
    	height: 'auto'
	}));*/
	//buttonView.add(button);
	var hNextSl = 13;
	var mNextSl = 0;
	var sNextSl = 0;
	 Ti.App.addEventListener("nextSleepChanged", function (event) {
    	hNextSl = event.hh;
		mNextSl = event.mm;
		sNextSl = event.ss;

    });
	setInterval(function(){
		  var date = new Date();
  		 var hours = date.getHours();
  		 var minutes = date.getMinutes();
  		 var seconds = date.getSeconds();
  		 var newHours = hNextSl > hours || (hNextSl == hours && mNextSl > minutes) ||  (hNextSl == hours && mNextSl == minutes && sNextSl > seconds) ? hNextSl : hNextSl + 24;
  		 var v1 = hours * 3600 + minutes * 60 + seconds;
  		 var v2 = newHours * 3600 + mNextSl * 60 + sNextSl;
  		 var d = v2 - v1;
  		 var ss = d % 60;
  		 d -= ss;
  		 d = Math.floor(d / 60);
  		 var mm = d % 60;
  		 d -= mm;
  		 var hh = Math.floor(d / 60); 	  
  		 labelTimer2.setText('' +  (hh > 9 ? '' : '0') + hh + 
  		  				':' +  (mm > 9 ? '' : '0') + mm +
  		  				':' +  (ss > 9 ? '' : '0') + ss); 		    
	}, 1000);
	panelView.add(button);
	
/*	var textArea = Ti.UI.createTextArea({
  borderWidth: 2,
  borderColor: '#bbb',
  borderRadius: 5,
  color: '#888',
  font: {fontSize:20, fontWeight:'bold'},
  keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
  returnKeyType: Ti.UI.RETURNKEY_GO,
  textAlign: 'left',
  value: 'I am a textarea',
  top: 60,
  width: 300, height : 70
});
self.add(textArea);*/
	
		
	return self;
}

module.exports = MainView;

