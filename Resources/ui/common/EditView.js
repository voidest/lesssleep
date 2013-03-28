//FirstView Component Constructor
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

function TimeToStr(interval, i)
{
	var hAdd  = interval[i + 2] === 1 ? 12 : 0;
	var hPref = interval[i] + hAdd > 9 ? "" : "0";
	var mPref = interval[i + 1] > 9 ? "" : "0";
	
	return hPref + (interval[i] + hAdd) + ":" + mPref + interval[i + 1];
}

function IntervalToString(interval)
{
	return "" + TimeToStr(interval, 0) + " - " + TimeToStr(interval, 3);	
}

function EditView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%'/*,
	backgroundImage :"images/background.png"*/});
	
	//self.add(basicSwitch);
	self.layout = 'vertical';
	
	var topView = Ti.UI.createView({width:'100%', height:'30%', backgroundImage:'./images/gray-line-big.png'});
	
	//topView.layout = 'horizontal';
	self.add(topView);
	
	//TABLE VIEW********
	var sleepIntervals = [];
	sleepIntervals.push([10, 50, 1, 11, 50, 1]);
	sleepIntervals.push([ 4, 30, 1,  5, 30, 1]);
	sleepIntervals.push([ 6, 20, 0,  8, 30, 0]);
	//T
	var tableData = [];
	
	for(var idx = 0; idx < sleepIntervals.length; ++idx)
    {
    	var row = Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:idx, // custom property, useful for determining the row during events
    		//height:110
  		}); 
  		//row.layout = 'horizontal';
  		var labelUserName = Ti.UI.createLabel({
    		//color:'#576996',
    		font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    		text: IntervalToString(sleepIntervals[idx]),
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'5%',
    		width:'45%', height: 35
 		}); 		
  		row.add(labelUserName);
  		//
  		var image = Ti.UI.createImageView({
		  image:'/icons/icon-alarm.png',
		  height : 35,
		  left : '70%'
		});
		row.add(image);
  		//
  		var swTransform = Ti.UI.create2DMatrix().scale(0.75);
  		var basicSwitch = Ti.UI.createSwitch({
  			value:true, // mandatory property for iOS,
  			left:'75%',
  			transform : swTransform,
  			width : '35%'  
		});
		row.add(basicSwitch);
		
		
		//
  		tableData.push(row);   	
	}
	
	var tableView = Ti.UI.createTableView({
     backgroundColor:'white',
     height :'45%',
     data:tableData,
     footerTitle:''
    });
    self.add(tableView);
    
    
    
    //add bottom buttons
	var panelView = Ti.UI.createView({width:'100%', height:'25%', backgroundImage:'./images/gray-line-big.png'});
	
	panelView.layout = 'horizontal';
	self.add(panelView);
	//LABELS VIEW ************
	var labelsView = Ti.UI.createView({width:'30%', height:'100%'});
	panelView.add(labelsView);
	labelsView.layout = 'vertical';
	
	var labelTimer1 = Ti.UI.createLabel({
 		color: '#000',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
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
  		font:{fontSize:10,fontWeight:'bold',fontFamily:'Helvetica Neue'},
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
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
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
  		font:{fontSize:10,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
  		text:L('sleep_left'),
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		//top: '2%',
  		left: '10%',
  		width: '90%', height: '8%'
	});
	labelsView.add(labelSleepLeft);
	///buttons!!
	var buttonView = Ti.UI.createView({width:'70%', height:'100%'});
	//buttonView.layout = 'horizontal';
	var undoButton = Titanium.UI.createButton({
   		//backgroundColor :'#ffffff',
   		image:'./icons/icon-undo.png',
   		//backgroundSelectedImage:'./images/button-red-active.png',
   		//font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:'2%',
   		width:35,
   		height: '35%'
		});
	buttonView.add(undoButton);
	
	var button = Titanium.UI.createButton({
   		title: L('edit_move_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-red.png',
   		backgroundSelectedImage:'./images/button-red-active.png',
   		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:'20%',
   		width: '30%',
   		height: '35%'
		});
	buttonView.add(button);
	
	var skipButton = Titanium.UI.createButton({
   		title: L('edit_skip_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-red.png',
   		backgroundSelectedImage:'./images/button-red-active.png',
   		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		left:'55%',
   		width: '35%',
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
	buttonView.add(skipButton);
	
	panelView.add(buttonView);	
	return self;
}

module.exports = EditView;
