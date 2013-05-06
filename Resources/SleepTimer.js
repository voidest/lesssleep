/*window.onload = function() {
	//alert('kal');
	//$(function(){
	  $('#counter').load(function(){$('#counter').countdown({
          image: 'digits@2x.png',
          format: 'hh:mm:ss',
          digitWidth:106,
          digitHeight:154,
          startTime: '01:12:00'
      });
        });
      //});
    //alert('kal1');
}*/
window.onload = function() {
	document.ontouchmove = function(event) {event.preventDefault();};
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:123, pace:600, auto:true});

		/**
		 * Demo controls
		 */
		
		var smartInc = 0;
}