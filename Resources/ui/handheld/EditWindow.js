//Application Window Component Constructor
function EditWindow() {
	//load component dependencies
	var EditView = require('ui/common/EditView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff', navBarHidden: true
	});
	self.layout = 'vertical';
		
	//construct UI
	var firstView = new EditView();
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = EditWindow;
