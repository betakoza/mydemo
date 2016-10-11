module.exports = function(){
  var targets = this.options.sync.targets,

    syncSliders = function(event){
      var index = event.index;

      // loop thru all partner sliders & force-sync their active slide index
      for (var i = 0; i < targets.length; i++) {
        window[ targets[i] ].el.slide( index );
      }
    };

  // when this slider activates a slide, sync others
  this.el.on('activate', syncSliders);
};
