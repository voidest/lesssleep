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
	
	//self.add(sleepView);	
	//construct UI
	var firstView = new MainView();
	self.add(firstView);
	/*self.addEventListener("sleepButtonPressed", function(e) {
			self.animate({view:sleepView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		});*/var sleepWnd = Ti.UI.createWindow({
		backgroundColor:'#ffffff', navBarHidden: true, tabBarHidden:true});
		sleepWnd.add(sleepView);
	Ti.App.addEventListener("sleepButtonPressed", function (event) {
    		//self.animate({view:sleepView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
    			
		self.containingTab.open(sleepWnd, {animated:true});
		

    });
    
    Ti.App.addEventListener("wakeButtonPressed", function (event) {
    		//self.animate({view:sleepView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
    					//self.containingTab.open(self, {animated:true});
		self.containingTab.close(sleepWnd, {animated:true});

    });

	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
