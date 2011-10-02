/**
 * listen to touch events on touchDevice and notify callback with
 * 'left', 'right', 'up', 'down' or 'click'
*/
function touchControl(callback){
	var touchStartX, touchStartY;
	
	var onTouchDevice	= 'createTouch' in document;
	if( !onTouchDevice )	return;

	document.addEventListener( 'touchstart', onTouchStart, false );
	document.addEventListener( 'touchmove', onTouchMove, false );
	document.addEventListener( 'touchend', onTouchEnd, false );

	function onTouchStart(event) {
		touchStartX	= event.changedTouches[0].pageX;
		touchStartY	= event.changedTouches[0].pageY;
	}

	function onTouchMove(event) {
		 // Prevent the browser from doing its default thing (scroll, zoom)
		event.preventDefault(); 
	} 
	 
	function onTouchEnd(event) { 
		var deltaX	= event.changedTouches[0].pageX - touchStartX;
		var deltaY	= event.changedTouches[0].pageY - touchStartY;
		var maxDelta	= 30;

		// handle long slides
		if( Math.abs(deltaX) > Math.abs(deltaY) )	deltaY	= 0;
		if( Math.abs(deltaY) > Math.abs(deltaX) )	deltaX	= 0;

		if( Math.abs(deltaY) <= maxDelta ){
			if( deltaX >  maxDelta )	callback('right');
			else if( deltaX < -maxDelta )	callback('left');
			else				callback('click');
		}else{
			if( deltaY >  maxDelta )	callback('down');
			else 				callback('up');
		}
	}	
}
