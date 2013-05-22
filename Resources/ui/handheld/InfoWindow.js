//Application Window Component Constructor
function InfoWindow() {
	//load component dependencies
	var InfoView = require('ui/common/InfoView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff', navBarHidden: true
	});
	self.layout = 'vertical';
		
	//construct UI
	var firstView = new InfoView();
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = InfoWindow;
