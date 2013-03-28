//FirstView Component Constructor
function MainView(parentRect) {
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
	self.layout = 'vertical';
	var ClockView = require('ui/common/ClockView');
	clockView = new ClockView('100%', '75%');
	
	var panelView = Ti.UI.createView({width:'100%', height:'25%', backgroundImage:'./images/gray-line-big.png'});
	
	panelView.layout = 'horizontal';
	self.add(clockView);
	self.add(panelView);
	
	
	
	var labelsView = Ti.UI.createView({width:'60%', height:'100%'});
	panelView.add(labelsView);
	labelsView.layout = 'vertical';
	
	var labelTimer1 = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'03:40',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: '5%',
  		left: '10%',
  		width: '90%', height: '25%'
	});
	labelsView.add(labelTimer1);
	
	var labelSleepTime = Ti.UI.createLabel({
 		color: '#494d56',
  		font:{fontSize:11,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:L('nearest_sleep'),
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		//top: '2%',
  		left: '10%',
  		width: '90%', height: '8%'
	});
	labelsView.add(labelSleepTime);
	
	var labelTimer2 = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:'01:40:13',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: '18%',
  		left: '10%',
  		width: '90%', height: '25%'
	});
	labelsView.add(labelTimer2);
	
	var labelSleepLeft = Ti.UI.createLabel({
 		color: '#494d56',
  		font:{fontSize:11,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:L('sleep_left'),
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		//top: '2%',
  		left: '10%',
  		width: '90%', height: '8%'
	});
	labelsView.add(labelSleepLeft);
	
	
	var buttonView = Ti.UI.createView({width:'40%', height:'100%'});
	
	var button = Titanium.UI.createButton({
   		title: L('sleep_btn_txt'),
   		width: '60%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-red.png',
   		backgroundSelectedImage:'./images/button-red-active.png',
   		font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		height: '35%'
		});
	/*button.add(Ti.UI.createLabel({
    	text: L('sleep_btn_txt'),
    	color: 'red',
    	shadowColor: '#50000000',
    	shadowOffset: {x:0,y:-1},
    	width: 'auto',
    	height: 'auto'
	}));*/
	buttonView.add(button);
	panelView.add(buttonView);
	
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

