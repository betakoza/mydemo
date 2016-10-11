module.exports = function(options) {
  return function(slider) {
    var axis = options == 'vertical' ? 'Y' : 'X',
      startPosition,
      delta;

    var handleStart = function(e) {
      if (e.touches.length == 1) {
        startPosition = e.touches[0]['page' + axis];
        delta = 0;
      }
    },
    handleMove = function(e) {
      if (e.touches.length == 1) {
        e.preventDefault();
        delta = e.touches[0]['page' + axis] - startPosition;
      }
    },
    handleEnd = function() {
      if (Math.abs(delta) > 50) {
        slider[delta > 0 ? 'prev' : 'next']();
      }
    };

    slider.parent.addEventListener('touchstart', handleStart);
    slider.parent.addEventListener('touchmove', handleMove);
    slider.parent.addEventListener('touchend', handleEnd);

    slider.on('destroy', function(){
      console.log( 'touches: destroy' );
      slider.parent.removeEventListener('touchstart', handleStart);
      slider.parent.removeEventListener('touchmove', handleMove);
      slider.parent.removeEventListener('touchend', handleEnd);
    })
  };
};
