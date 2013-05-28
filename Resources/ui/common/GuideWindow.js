var sideOffset = '31px';
var topOffs = '23px';

function CreateGuideTable(topCoord)
{
	var data = [
		{title:'How to start'},
		{title:'Your first schedule'},
		{title:'Learning to sleep'},
		{title:'Sleep hygiene'},
		{title:'Nigth lightning'},
		{title:'Adaptation tips'},
	];
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
  		if(i == 1){
  			row.test = 'ui/common/GuideWindow';
  		}
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


function GuideWin(_args) {
	var self = Ti.UI.createWindow({
		title:_args.title,
		backgroundColor:'white',
		navBarHidden: false,
		backgroundImage :"images/cream-bg.png"
	});
	
	var informationLbl = Ti.UI.createLabel({
    		color: '#4c566c',
  		font:{fontSize:'17px',fontWeight:'bold',fontFamily:'Helvetica Neue'},
  		shadowColor: '#d8ffffff',
  		shadowOffset: {x:0, y:1},
    		text: 'Beginners guide',
    		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    		left:'51px',
    		top:'26px',
    		//width:'100%', height: 35
 		}); 	
 	self.add(informationLbl);	
	// add table view to the window
	self.add(CreateGuideTable('36px'));
	return self;
}

module.exports = GuideWin;
