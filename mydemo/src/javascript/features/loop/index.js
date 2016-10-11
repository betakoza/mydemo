module.exports = function(){
  var slider = this.el;
  
  slider.on('prev', function(e) {
    if (e.index == 0) slider.slide(slider.slides.length - 1);
  });

  slider.on('next', function(e) {
    if (e.index == slider.slides.length - 1) slider.slide(0);
  });
};
