module.exports = function(elem){
  var self = this;

  var handleOver = function(){
    self.el.fire('pauseAutoplay'); // pause timer
  },
  handleOut = function(){
    self.el.fire('resetAutoplay'); // reset timer
  };

  elem.addEventListener('mouseover', handleOver);
  elem.addEventListener('mouseout', handleOut);

  self.el.on('destroy', function(){
    console.log( 'listenToHover: destroy' );
    elem.removeEventListener('mouseover', handleOut);
    elem.removeEventListener('mouseout', handleOver);    
  })
};
