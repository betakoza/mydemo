module.exports = function(options) {
  return function(slider) {
    var isHorizontal = options !== 'vertical';

    var handler = function(e){
      if (e.which == 34 || // PAGE DOWN
        e.which == 32 || // SPACE
        (isHorizontal && e.which == 39) || // RIGHT
        (!isHorizontal && e.which == 40) // DOWN
      ) { slider.next(); }

      if (e.which == 33 || // PAGE UP
        (isHorizontal && e.which == 37) || // LEFT
        (!isHorizontal && e.which == 38) // UP
      ) { slider.prev(); }
    }

    document.addEventListener('keydown', handler);
    slider.on('destroy', function(){
      console.log( 'keys: destroy' );
      document.removeEventListener('keydown', handler);
    })
  };
};
