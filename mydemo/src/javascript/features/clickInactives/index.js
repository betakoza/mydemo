module.exports = function(slides){
  var self = this,
    handleClick = function(e){

      // get this index
      var index = slides.indexOf(this);

      // set slider to this index
      return self.el.slide(index);
    };

  for (var i = 0; i < slides.length; i++) {
    // allow clicks on inactive slides
    slides[i].style.pointerEvents = 'auto';
    slides[i].style.cursor = 'pointer';

    // assign click listener to all, initially
    slides[i].addEventListener('click', handleClick);
  }

  // remove click listener on active slide
  this.el.on('activate', function(event){
    event.slide.removeEventListener('click', handleClick);
  });

  // reassign click listener when active-slide deactivates
  this.el.on('deactivate', function(event){
    event.slide.addEventListener('click', handleClick);
  });

  this.el.on('destroy', function(){
    console.log( 'clickInactives: destroy' );
    slides.map(function(slide){
      slide.removeAttribute('style');
      slide.removeEventListener('click', handleClick);
    })
  })
};
