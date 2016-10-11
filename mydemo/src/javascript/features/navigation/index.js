module.exports = function(){
  var self = this,
    opts = self.options,
    parent = self.el.parent;

  var listenTo = function(elem, goForward){
    // click to navigate
    elem.addEventListener('click', function(event){
      event.preventDefault();
      goForward ? self.el.next() : self.el.prev();
    });

    // if autoplay && pausehover, pause on hovering the arrow
    if (opts.autoplay.enabled && opts.autoplay.pauseHover) {
      self.listenToHover( elem );
    }
  };

  var prev = parent.querySelector( opts.navigation.prev ),
    next = parent.querySelector( opts.navigation.next );

  if (next) listenTo(next, true);
  if (prev) listenTo(prev, false);
};
