//FirstView Component Constructor
var sideOffset = '31px';
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
	return "" + TimeToStr(interval, 0) + " – " + TimeToStr(interval, 3);	
}

function IntervalToRow(interval, idx)
{
	var row = Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:idx, // custom property, useful for determining the row during events
    		width:"100%"
    		//height:110
  		}); 
  		//row.layout = 'horizontal';
  		var labelUserName = Ti.UI.createLabel({
    		//color:'#576996',
    		
    		font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    		text: IntervalToString(interval),
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:sideOffset,
    		//top: '17px',
    		top:'10px',
    		width:'45%', height: Ti.UI.SIZE
 		}); 		
  		row.add(labelUserName);
  		//
  		var image = Ti.UI.createImageView({
		  image:'/icons/icon-alarm.png',
		  height : 35,
		  left : '65%'
		});
		row.add(image);
  		//
  		var swTransform = Ti.UI.create2DMatrix().scale(0.72);
  		var basicSwitch = Ti.UI.createSwitch({
  			value:true, // mandatory property for iOS,
  			//right:sideOffset,
  			transform : swTransform,
  			//left:'478px',
  			left:'416px',
  			//width : '153px',
  			//height : '53px'  
		});
		row.add(basicSwitch);
		return row;
}

function EditView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%',
	backgroundImage :"images/cream-bg.png"});
	
	//self.add(basicSwitch);
	
	var webView = Ti.UI.createWebView({
		disableBounce:true,
		scalesPageToFit:true,
	  left:sideOffset,
	 // top:'6%',
	  //width:'70%' ,
	  width:'332px',
      height: '152px'  , backgroundColor : 'transparent'        
    });
	 var first = Boolean(true);
	//self.layout = 'vertical';
	
	var topView = Ti.UI.createView({width:'100%', height:'184px', top:'0px', backgroundImage:'./images/gray-bg.png'});
	var sleepIntervals = [];
	sleepIntervals.push([1, 30, 0, 5, 0, 0]);
	sleepIntervals.push([ 1, 0, 1,  1, 20, 1]);
	sleepIntervals.push([ 5, 0, 1,  5, 20, 1]);
	sleepIntervals.push([ 9, 0, 1,  9, 20, 1]);
	var sstates = [1,1,1,1];
	self.addEventListener('postlayout',function(e)
	{
		var w = 166;
		var h = 76;
		var currH = Ti.Platform.displayCaps.platformHeight * 0.2;
		//webView.reload();
		//webView.repaint(); 
		/*if(h < currH)
		{
			return;
		}*/
		Ti.API.info("Received " + w + " " + h + " new rows.");
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
 		 "margin:0;background-color:RGBA(0,0,0,0);"+ 		 
 		 "}"+
 		 "</style>"+ 		 
 		 "<meta charset=\"utf-8\">"+
 			"<script type=\"text/javascript\" src=\"./DoubleClockWidget.js\"></script>"+
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
	    topView.add(webView);
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
		/*var sleepIntervals = [];
		sleepIntervals.push([10, 50, 1, 11, 50, 1]);
		sleepIntervals.push([ 4, 30, 1,  5, 30, 1]);
		sleepIntervals.push([ 6, 20, 0,  8, 30, 0]);*/
		
		webView.addEventListener('load', function(e) {
			/*if(!firstLoad)
			  return;
			firstLoad = Boolean(false);*/
			//alert(sleepIntervals);
			//webView.evalJS("setIntervals('" + sleepIntervals + "');"); 
			Ti.App.fireEvent("web:data1", {data: sleepIntervals, states:sstates});
			webView.frame = self.frame;	
		
			webView.disableBounce = true;
		});
		webView.touchEnabled = true;	
		
	});	
	//topView.layout = 'horizontal';
	//Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
    //Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);
	
	self.add(topView);
	
	//var topRightView = Ti.UI.createView({left:'70%',top:'0%',width:'30%',height:'100%'});
	var labelSlTime = Ti.UI.createLabel({
    		color: '#000',
  		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
    		text: '04:30',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
    		right:sideOffset,
    		top: '56px',
    	//	width:'85%', height: 35
 		}); 	
 	topView.add(labelSlTime);
 	var labelSlTimeTxt = Ti.UI.createLabel({
    		color: '#494d56',
  		font:{fontSize:10,fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#fff',
  		shadowOffset: {x:0, y:1},
    		text: 'Total sleeping time',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
    		right:sideOffset,
    		top:'95px',
    		//width:'100%', height: 35
 		}); 	
 	topView.add(labelSlTimeTxt);	
 	
	
	//TABLE VIEW********
	
	//Ti.App.fireEvent("web:data1", {data: sleepIntervals});
	//T
	var tableData = [];
	
	for(var idx = 0; idx < sleepIntervals.length; ++idx)
    {
    	var row = IntervalToRow(sleepIntervals[idx], idx);/* Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:idx, // custom property, useful for determining the row during events
    		width:"100%"
    		//height:110
  		}); 
  		//row.layout = 'horizontal';
  		var labelUserName = Ti.UI.createLabel({
    		//color:'#576996',
    		
    		font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    		text: IntervalToString(sleepIntervals[idx]),
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:sideOffset,
    		//top: '17px',
    		top:'10px',
    		width:'45%', height: Ti.UI.SIZE
 		}); 		
  		row.add(labelUserName);
  		//
  		var image = Ti.UI.createImageView({
		  image:'/icons/icon-alarm.png',
		  height : 35,
		  left : '65%'
		});
		row.add(image);
  		//
  		var swTransform = Ti.UI.create2DMatrix().scale(0.72);
  		var basicSwitch = Ti.UI.createSwitch({
  			value:true, // mandatory property for iOS,
  			//right:sideOffset,
  			transform : swTransform,
  			//left:'478px',
  			left:'416px',
  			//width : '153px',
  			//height : '53px'  
		});
		row.add(basicSwitch);*/
		
		
		//
  		tableData.push(row);   	
	}
	
	var tableView = Ti.UI.createTableView({
     backgroundColor:'white',
     //height :'45%',
     //top:'184px',
     //bottom:'184px',
     top:'165px',
    // bottom:'184px',
     //width:'100%',
     left: '10px',
     right: '10px',
     //backgroundImage :"images/cream-bg.png",
     maxRowHeight:'70px',
     style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
     data:tableData,
     //borderRadius:10,
     borderWidth:0,
     //backgroundView:nil,
     backgroundColor:'transparent',
     rowBackgroundColor:'white',
     //borderColor:'#E0E0E0',
     
     footerTitle:''
    });
    self.add(tableView);
    
    
    
    //add bottom buttons
    
	var top1Offset = '22px';
	var top2Offset = '59px';
	var top21Offset = '99px';
	var top22Offset = '135px';
	var panelView = Ti.UI.createView({width:'100%', height:'184px', bottom :'0px', backgroundImage:'./images/gray-bg.png'});
	
	//panelView.layout = 'horizontal';
	self.add(panelView);
	//LABELS VIEW ************
	
	
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
	///buttons!!
	//var buttonView = Ti.UI.createView({width:'70%', height:'100%'});
	//buttonView.layout = 'horizontal';
	var undoButton = Titanium.UI.createButton({
   		//backgroundColor :'#ffffff',
   		backgroundImage:'./images/button-undo.png',
   		backgroundSelectedImage:'./images/button-undo-pressed.png',
   		//font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		right:'320px',
   		width:'89px',
   		height: '92px'
		});
	panelView.add(undoButton);
	
	var skipButton = Titanium.UI.createButton({
   		//title: L('edit_move_btn'),
   		//width: '30%',
   		//backgroundColor :'#ff0000',
   		backgroundImage:'./images/button-skip.png',
   		backgroundSelectedImage:'./images/button-skip-pressed.png',
   		//font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
   		right:sideOffset,
   		width: '269px',
   		height: '92px'
		});
	//buttonView.add(button);
	
	
	/*button.add(Ti.UI.createLabel({
    	text: L('sleep_btn_txt'),
    	color: 'red',
    	shadowColor: '#50000000',
    	shadowOffset: {x:0,y:-1},
    	width: 'auto',
    	height: 'auto'
	}));*/
	panelView.add(skipButton);
	var hNextSl = 13;
	var mNextSl = 0;
	var sNextSl = 0;
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
	
	skipButton.addEventListener('click', function(e)
	{
		/*var date = new Date (); 
		var notification = Ti.App.iOS.scheduleLocalNotification (
			{ alertBody: "YA YA YABLOKI YELA", 
			alertAction: "Re-Launch!", 
			userInfo: {"hello": "world"}, 
			sound: "pop.caf", 
			date: new Date (new Date (). getTime () + 8000) });*/
			var sleepIntervals = [];
			sleepIntervals.push([1, 30, 0, 5, 0, 0]);
			sleepIntervals.push([ 1, 0, 1,  1, 20, 1]);
			sleepIntervals.push([ 5, 0, 1,  5, 20, 1]);
			sleepIntervals.push([ 9, 0, 1,  9, 20, 1]);
			sleepIntervals.push([4, 0, 1, 5, 30, 1]);
			var sstates = [1,-1,-1, 1, 0];
			var sleepIntervals1 = [];
			sleepIntervals1.push([1, 30, 0, 5, 0, 0]);
			sleepIntervals1.push([ 9, 0, 1,  9, 20, 1]);
			sleepIntervals1.push([4, 0, 1, 5, 30, 1]);
			Ti.App.fireEvent("web:data1", {data: sleepIntervals, states:sstates});
			Ti.App.fireEvent("web:data", {data: sleepIntervals1});
			tableView.deleteRow(2, {animated : true, animationStyle : Titanium.UI.iPhone.RowAnimationStyle.FADE});
			tableView.deleteRow(1, {animated : true, animationStyle : Titanium.UI.iPhone.RowAnimationStyle.FADE});
			var row = IntervalToRow(sleepIntervals[4], 2);
			tableView.appendRow(row, {animated : true, animationStyle : Titanium.UI.iPhone.RowAnimationStyle.FADE});
			hNextSl = 16;
			labelSlTime.setText('05:20');
			Ti.App.fireEvent("nextSleepChanged", {hh : 16, mm:0, ss:0});
			
	});
	
	//panelView.add(buttonView);	
	return self;
}

module.exports = EditView;
