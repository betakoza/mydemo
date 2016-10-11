module.exports = function(slides){
  if (typeof Parallax == 'undefined'){
    return console.error( 'You must have the Parallax library loaded in order to use parallax effects!' );
  }

  var self = this,
    opts = self.options,
    useShadow = opts.shadows.enabled;

  var cls = opts.parallax.className,
    fric = opts.parallax.friction,
    settings = opts.parallax.settings,
    // add our parallax classname & friction setting to slide
    applyParallaxTo = function(item){
      classie.add(item, cls);
      item.setAttribute('data-depth', fric);
    };

  // Loop thru our slides, setup parallax-ing
  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    applyParallaxTo( slide.firstElementChild ); // bee3D--inner
    if (useShadow) applyParallaxTo( slide.lastChild );
  }

  // quickly modify settings object
  settings.className = cls;
  
  // now initialize parallax!
  self._parallax = new Parallax(self.el.parent, opts.parallax.settings);
  self.el.parent.style.transformStyle = 'initial'; // reset 'preserve-3D'

  self.el.on('destroy', function(){
    console.log( 'parallax: destroy' );
    // clean our parent
    self.el.parent.removeAttribute('style');
    // disable it
    self._parallax.disable();
    // save layers
    var layers = self._parallax.layers;
    // dump everything
    self._parallax = self._parallax.layers = self._parallax.element = undefined;
    // loop thru layers & reset attributes & styles
    // go from the back, because Parallax ignores 'shadow' layer once 'slide' has been cleansed
    for (var i = layers.length - 1; i >= 0; i--) {
      var item = layers[i];
      classie.remove(item, cls);
      item.removeAttribute('data-depth');
      item.removeAttribute('style');
    }
  })
};
