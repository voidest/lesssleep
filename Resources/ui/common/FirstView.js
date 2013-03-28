//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#FF0000',
		text:String.format(L('welcome'),'Titanium'),
		height:'auto',
		width:'auto'
	});
	var button = Titanium.UI.createButton({
   title: 'Hello',
   top: 10,
   width: '100%',
   height: 50
	});
	
	button.addEventListener('click',function(e)
	{
   		alert('The file has been deleted');
	});
	
	var pb=Titanium.UI.createProgressBar({
    top:10,
    width:250,
    height:'auto',
    min:0,
    max:10,
    value:0,
    color:'#fff',
    message:'Downloading 0 of 10',
    font:{fontSize:14, fontWeight:'bold'},
    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
});
self.add(pb);
pb.show();
/*
var webView1 = Ti.UI.createWebView({
	top:10,
    width:250 ,
    height:250          
}); 
var intWidth = 250;
var intHeight = 250;    
htmlContent = "<html >"+
             "<head >"+
            "<script type = \"text/javascript\"src = \"https://www.google.com/jsapi\" > </script>"+
            "<script type=\"text/javascript \">"+
                 "var chart, data;"+
             "function adjustWorkValue(v){"+
             "data.setCell(0,1,v);"+
      "chart.draw(data, {width: "+intWidth+", height: "+intHeight+", is3D: true, title: 'My Daily Activities', top:-100, left:-100});"+
              "}"+
             "google.load('visualization', '1', {'packages':['corechart']});"+
             "google.setOnLoadCallback(drawChart);"+
             "function drawChart() {"+
             "data = new google.visualization.DataTable();"+
             "data.addColumn('string', 'Task');"+
             "data.addColumn('number', 'Hours per Day');"+      
             "data.addRows(["+
  "['Work', 11],"+
  "['Eat', 2],"+
  "['Commute', 2],"+
  "['Watch TV', 2]"+
"]);"+
        "if ( chart == undefined ) {"+ 
        "chart =new google.visualization.PieChart(document.getElementById('chart_div'));"+
        "}"+
        "chart.draw(data, {top:-100,left:-100,width: "+intWidth+", height: "+intHeight+", is3D: true, title: 'Welcome'});"+
        "google.visualization.events.addListener(chart, 'select', function(event){"+
        "Titanium.App.fireEvent(\"click_chart\",{d: chart.getSelection()});"+           
        "});"+
        "}"+                  
        "</script>"+
        "</head>"+
        "<body>"+
        "<div id=\"chart_div\"></div>"+
        "</body>"+
        "</html>";      
webView1.html = htmlContent;
webView1.reload();
webView1.repaint(); 
webView1.touchEnabled = true;*/
/*var bb1 = Titanium.UI.createTabbedBar({
    labels:['One', 'Two', 'Three'],
    backgroundColor:'#336699',
    top:250,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:100,
    width:300
});
self.add(bb1); */
//self.add(webView1);
	
	self.add(label);
	self.add(button);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = FirstView;
