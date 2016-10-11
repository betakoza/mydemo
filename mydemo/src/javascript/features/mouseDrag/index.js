module.exports = function(){
  var self = this,
    parent = this.el.parent,
    start, delta,

    handleDown = function(e) {
      start = e.x;
      delta = 0;
    },

    handleMove = function(e) {
      e.preventDefault();
      delta = e.x - start;
    },

    handleUp = function() {
      if (Math.abs(delta) > 50) {
        self.el[delta > 0 ? 'prev' : 'next']();
      }
    };


  // mouse cursor
  classie.add(parent, 'draggable');
  parent.addEventListener('mousedown', handleDown);
  parent.addEventListener('mousemove', handleMove);
  parent.addEventListener('mouseup', handleUp);

  this.el.on('destroy', function(){
    console.log( 'mousedrag: destroy' );
    classie.remove(parent, 'draggable')
    parent.removeEventListener('mousedown', handleDown);
    parent.removeEventListener('mousemove', handleMove);
    parent.removeEventListener('mouseup', handleUp);    
  })
};
