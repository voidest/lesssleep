// Keep a reference to this window so it does not get collected on Android.
var messageWin;
function ApplicationTabGroup() {
	//create module instance
	
	var self = Ti.UI.createTabGroup();
		var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
		var Window;
		var WindowEdit;
		if (isTablet) {
			Window = require('ui/tablet/ApplicationWindow');
			WindowEdit = require('ui/tablet/EditWindow');
		}
		else {
			// Android uses platform-specific properties to create windows.
			// All other platforms follow a similar UI pattern.
			if (osname === 'android') {
				Window = require('ui/handheld/android/ApplicationWindow');
				WindowEdit = require('ui/handheld/android/EditWindow');
			}
			else {
				Window = require('ui/handheld/ApplicationWindow');
				WindowEdit = require('ui/handheld/EditWindow');
			}
		}
		//BaseUIWindow = require('ui/common/BaseUIWindow'),
		/*ControlsWindow = require('ui/common/ControlsWindow'),
		PhoneWindow = require('ui/common/PhoneWindow'),
		PlatformWindow = require('ui/common/PlatformWindow'),
		MashupsWindow = require('ui/common/MashupsWindow');
		*///MessageWindow = require('ui/common/MessageWindow');
	
	//create app tabs
	var /*baseUIWin = new BaseUIWindow(L('base_ui_title')),
		controlsWin = new ControlsWindow(L('controls_win_title')),
		phoneWin = new PhoneWindow(L('phone_win_title')),
		platformWin = new PlatformWindow(L('platform_win_title')),
		mashupsWin = new MashupsWindow(L('mashups_win_title'));
		//messageWin = new MessageWindow();
		*/
		baseWin = new Window(),
		editWin = new WindowEdit(),
		infoWin = new Window(),
		settingsWin = new Window();
	
	var baseUITab = Ti.UI.createTab({
		title: 'Main',// L('main_tab_title'),
		icon: '/icons/timer.png',
		window: baseWin
	});
	baseWin.containingTab = baseUITab;
	self.addTab(baseUITab);
	
	
	var editTab = Ti.UI.createTab({
		title: L('edit_tab_title'),
		icon: '/icons/pencil.png',
		window: editWin
	});
	editWin.containingTab = editTab;
	self.addTab(editTab);

	var infoTab = Ti.UI.createTab({
		title: L('info_tab_title'),
		icon: '/icons/university.png',
		//window: infoWin
	});
	infoWin.containingTab = infoTab;
	self.addTab(infoTab);
	
	var settingsTab = Ti.UI.createTab({
		title: L('settings_tab_title'),
		icon: '/icons/settings.png',
		//window: settingsWin
	});
	settingsWin.containingTab = settingsTab;
	self.addTab(settingsTab);
	self.activeTab = editTab;
	/*
	var controlsTab = Ti.UI.createTab({
		title: L('controls_win_title'),
		icon: '/images/tabs/KS_nav_views.png',
		window: controlsWin
	});
	controlsWin.containingTab = controlsTab;
	self.addTab(controlsTab);
	
	var phoneTab = Ti.UI.createTab({
		title:L('phone_win_title'),
		icon:'/images/tabs/KS_nav_phone.png',
		window:phoneWin
	});
	phoneWin.containingTab = phoneTab;
	self.addTab(phoneTab);
	
	var platformTab = Ti.UI.createTab({
		title:L('platform_win_title'),
		icon:'/images/tabs/KS_nav_platform.png',
		window:platformWin
	});
	platformWin.containingTab = platformTab;
	self.addTab(platformTab);
	
	var mashupsTab = Ti.UI.createTab({
		title:L('mashups_win_title'),
		icon:'/images/tabs/KS_nav_mashup.png',
		window:mashupsWin
	});
	mashupsWin.containingTab = mashupsTab;
	self.addTab(mashupsTab);
	
	self.setActiveTab(1);
	
	
	// Tabgroup events and message window
	messageWin = Titanium.UI.createWindow({
		height:30,
		width:250,
		bottom:70,
		borderRadius:10,
		touchEnabled:false,
		orientationModes : [
			Titanium.UI.PORTRAIT,
			Titanium.UI.UPSIDE_PORTRAIT,
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
	});
	if (Ti.Platform.osname === 'iphone') {
		messageWin.orientationModes = [Ti.UI.PORTRAIT]
	}
	
	var messageView = Titanium.UI.createView({
		id:'messageview',
		height:30,
		width:250,
		borderRadius:10,
		backgroundColor:'#000',
		opacity:0.7,
		touchEnabled:false
	});
		
	var messageLabel = Titanium.UI.createLabel({
		id:'messagelabel',
		text:'',
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});
	messageWin.add(messageView);
	messageWin.add(messageLabel);
	
	self.addEventListener('close', function(e) {
		if (e.source == self){
			if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
				self.open();
			}
		}
	});
	
	self.addEventListener('open',function(e) {
		if (e.source == self){
			Titanium.UI.setBackgroundColor('#fff');
			messageLabel.text = 'tab group open event';
			messageWin.open();
	
			setTimeout(function() {
				messageWin.close({opacity:0,duration:500});
			},1000);
		}
	});
	
	self.addEventListener('focus', function(e) {
		// On iOS, the "More..." tab is actually a tab container, not a tab. When it is clicked, e.tab is undefined.
		if (!e.tab) {
			return;
		}

		// iOS fires with source tabGroup. Android with source tab
		if ((e.source == baseUITab) || (e.source == controlsTab) || (e.source == phoneTab) || (e.source == platformTab) || (e.source == mashupsTab) || (e.source == self)) {

			messageLabel.text = 'tab changed to ' + e.index + ' old index ' + e.previousIndex;
			messageWin.open();

			setTimeout(function() {
				Ti.API.info('tab = ' + e.tab.title + ', prevTab = ' + (e.previousTab ? e.previousTab.title : null));
				messageLabel.text = 'active title ' + e.tab.title + ' old title ' + (e.previousTab ? e.previousTab.title : null);
			}, 1000);

			setTimeout(function() {
				messageWin.close({
					opacity : 0,
					duration : 500
				});
			}, 2000);
		}

	}); 
	
	self.addEventListener('blur', function(e) {
		Titanium.API.info('tab blur - new index ' + e.index + ' old index ' + e.previousIndex);
	});*/
	self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;
