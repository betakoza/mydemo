module.exports = function(){
  var self = this,

    start = function() {
      self.timer = setTimeout(function(){
        self.el.next();
      }, self.options.autoplay.speed);
    },

    stop = function(){
      clearTimeout(self.timer);
    },

    reset = function(){
      stop(); start();
    };

  // begin autoplay immediately
  start();

  // start on 'resumeAutoplay' event
  self.el.on('resumeAutoplay', start);

  // pause on 'pauseAutoplay' event
  self.el.on('pauseAutoplay', stop);

  // reset on 'resetAutoplay' event
  self.el.on('resetAutoplay', reset);

  // on each 'activate' event, reset timer!
  // -- aka, reset timer on ANY slide change
  self.el.on('activate', reset);

  // pause if hovering the active slide 
  if (self.options.autoplay.pauseHover) {
    self.el.on('activate', function(event){
      self.listenToHover( event.slide ); // newly-activated slide
    });
  }

  self.el.on('destroy', function(){
    console.log( 'autoplay: destroy' );
    stop()
  })

};
