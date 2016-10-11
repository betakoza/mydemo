module.exports = function(){
  var self = this,
    parent = this.el.parent,
    handleScroll = function(event){
      var delta = event.wheelDelta || -event.detail;
      return (delta < 0) ? self.el.next() : self.el.prev();
    };

  parent.addEventListener('mousewheel', handleScroll);
  parent.addEventListener('DOMMouseScroll', handleScroll);

  this.el.on('destroy', function(){
    console.log( 'mousescroll: destroy' );
    parent.removeEventListener('mousewheel', handleScroll);
    parent.removeEventListener('DOMMouseScroll', handleScroll);
  })
};
