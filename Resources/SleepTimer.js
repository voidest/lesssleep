window.onload = function() {
	$(function(){
	    $('#counter').countdown({
          image: 'digits.png',
          format: 'hh:mm:ss',
          startTime: '01:12:00'
        });
      });
}
