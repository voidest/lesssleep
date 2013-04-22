//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView');
	var SleepView = require('ui/common/SleepVIew');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff', navBarHidden: true
	});
		
	var sleepView = new SleepView();
	self.add(sleepView);	
	//construct UI
	var firstView = new MainView();
	self.add(firstView);
	/*self.addEventListener("sleepButtonPressed", function(e) {
			self.animate({view:sleepView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		});*/
	Ti.App.addEventListener("sleepButtonPressed", function (event) {
    		self.animate({view:sleepView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
    });
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
