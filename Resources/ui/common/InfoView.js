//FirstView Component Constructor
var sideOffset = '31px';
var topOffs = '23px';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;

function CreateTopView()
{
	var topView = Ti.UI.createView({width:'100%', height:'114px', top:'0px', backgroundImage:'./images/top-blue-bar.png'});
	
	var labelSlTimeTxt = Ti.UI.createLabel({
    		color: '#ffffff',
  		font:{fontSize:'16px',fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#88000000',
  		shadowOffset: {x:0, y:-1},
    		text: '386 hours',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'150px',
    		top:'35px',
    		//width:'100%', height: 35
 		}); 	
 	topView.add(labelSlTimeTxt);	
 	var labelSlTimeTxt1 = Ti.UI.createLabel({
    		color: '#ffffff',
  		font:{fontSize:'16px',fontWeight:'normal',fontFamily:'Helvetica Neue'},
  		shadowColor: '#88000000',
  		shadowOffset: {x:0, y:-1},
    		text: 'already saved',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'313px',
    		top:'35px',
    		//width:'100%', height: 35
 		}); 	
 	topView.add(labelSlTimeTxt1);	
 	return topView;
}

function CreateInformationTable(topCoord)
{
	var data = [
		{title:'What is polyphasic sleep', hasChild:true, test:'ui/common/baseui/tab_groups'},
		{title:'Beginners guide', hasChild:true, test:'ui/common/baseui/window_properties'},
		{title:'Schedule design', hasChild:true, test:'ui/common/baseui/window_layout'},
		{title:'Optimizing your sleep', hasChild:true, test:'ui/common/baseui/window_standalone'},
		{title:'Science', hasChild:true, test:'ui/common/baseui/views'}
	];
	var fnt = {fontWeight:'bold', size:'17px',fontFamily:'Helvetica Neue'};
	var tableData = [];
	for (var i = 0; i < data.length; i++ ) {
		var d = data[i];
		
		d.font = {fontWeight:'bold', size:'27px',fontFamily:'Helvetica Neue'};
		
		
		
		var row = Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:i, // custom property, useful for determining the row during events
    		width:"100%",
    		hasChild:true,
    		//height:110
  		}); 
  		//row.layout = 'horizontal';
  		var labelUserName = Ti.UI.createLabel({
    		//color:'#576996',
    		
    		font:{fontFamily:'Arial', fontSize:'17px', fontWeight:'bold'},
    		text: d.title,
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'20px',
    		//top: '17px',
    		top:topOffs,
    		width:Ti.UI.SIZE, height: Ti.UI.SIZE
 		}); 		
 		row.add(labelUserName);
 		tableData.push(row);   
	};
	
	
	
	var tableView = Ti.UI.createTableView({
     backgroundColor:'white',
     //height :'45%',
     //top:'184px',
     //bottom:'184px',
     top:topCoord,
    // bottom:'184px',
     //width:'100%',
     left: '10px',
     right: '10px',
     //backgroundImage :"images/cream-bg.png",
     rowHeight:'86px',
     maxRowHeight:'90px',
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
    return tableView;	
}

function CreateAdditionalTable(topCoord)
{
	/*var data = [
		{title:'Share with friends', hasChild:false},
		{title:'Personal consultation from $9.99', hasChild:true}
	];
	for (var i = 0; i < data.length; i++ ) {
		var d = data[i];
		
		d.font = {fontWeight:'bold', size:'27px',fontFamily:'Helvetica Neue'};
	};*/
	
	var tableData = [];
	
		
		var row1 = Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:0, // custom property, useful for determining the row during events
    		width:"100%"
  		}); 
  		var image = Ti.UI.createImageView({
		  image:'/images/share-icon.png',
		  height : '42px',
		  width : '42px',
		  left : '117px',top:topOffs
		});
		row1.add(image);
  		//row.layout = 'horizontal';
  		var labelUserName1 = Ti.UI.createLabel({
    		//color:'#576996',
    		
    		font:{fontFamily:'Arial', fontSize:'17px', fontWeight:'bold'},
    		text: 'Share with friends',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'169px',
    		//top: '17px',
    		top:topOffs,
    		width:Ti.UI.SIZE, height: Ti.UI.SIZE
 		}); 		
 		row1.add(labelUserName1);
 		tableData.push(row1);   
 		
 		var row2 = Ti.UI.createTableViewRow({
    		className:'forumEvent', // used to improve table performance
    		selectedBackgroundColor:'white',
    		rowIndex:0, // custom property, useful for determining the row during events
    		width:"100%",
    		hasChild:true,
  		}); 
  		//row.layout = 'horizontal';
  		var labelUserName2 = Ti.UI.createLabel({
    		//color:'#576996',
    		
    		font:{fontFamily:'Arial', fontSize:'17px', fontWeight:'bold'},
    		text: 'Personal consultation',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'20px',
    		//top: '17px',
    		top:topOffs,
    		width:Ti.UI.SIZE, height: Ti.UI.SIZE
 		}); 		
 		row2.add(labelUserName2);
 		var labelSlTimeTxt1 = Ti.UI.createLabel({
    		color: '#4c566c',
  		font:{fontSize:'17px',fontWeight:'normal',fontFamily:'Arial'},
  		
    		text: '$9.99',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		//left:'385px',
    		right:'10px',
    		top:topOffs,
    		//width:'100%', height: 35
 		}); 	
 	row2.add(labelSlTimeTxt1);

 		tableData.push(row2);   
	
	var tableView = Ti.UI.createTableView({
     backgroundColor:'white',
     //height :'45%',
     //top:'184px',
     //bottom:'184px',
     top:topCoord,
    // bottom:'184px',
     //width:'100%',
     left: '10px',
     right: '10px',
     //backgroundImage :"images/cream-bg.png",
     rowHeight:'86px',
     maxRowHeight:'90px',
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
    return tableView;	
}

function InfoView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({width:'100%',
	height:'100%',
	backgroundImage :"images/cream-bg.png"});
	
	//self.add(basicSwitch);
	
	
	
	
	self.add(CreateTopView());
	
	
	//TABLE VIEW********
	
	var informationLbl = Ti.UI.createLabel({
    		color: '#4c566c',
  		font:{fontSize:'17px',fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#d8ffffff',
  		shadowOffset: {x:0, y:1},
    		text: 'Information',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'51px',
    		top:'140px',
    		//width:'100%', height: 35
 		}); 	
 	self.add(informationLbl);	
    self.add(CreateInformationTable('150px'));	
    
    
    var additionalLbl = Ti.UI.createLabel({
    		color: '#4c566c',
  		font:{fontSize:'17px',fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#d8ffffff',
  		shadowOffset: {x:0, y:1},
    		text: 'Additional',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'51px',
    		top:'650px',
    		//width:'100%', height: 35
 		}); 	
 	self.add(additionalLbl);
 	self.add(CreateAdditionalTable('660px'));		
    return self;
}

module.exports = InfoView;
