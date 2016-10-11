module.exports = function(slides){
  var template = this.options.shadows.template;

  slides.forEach(function(slide){
    // var exists = false;
    // if (slide.querySelector(cls)) exists = true;
    // if (!exists) 
    slide.innerHTML += template;
  });

  this.el.on('destroy', function(){
    console.log( 'shadows: destroy' );
    slides.forEach(function(slide){
      slide.removeChild(slide.lastChild) // assuming is shadow-layer always
    })
  })
};
