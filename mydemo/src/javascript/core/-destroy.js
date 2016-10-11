module.exports = function(){
  // var elems = this.el.slides.concat(this.el.parent);
  var parent = this.el.parent;
  var slides = this.el.slides;
  var regex = new RegExp('bee3D-(.*)', 'g');

  parent.className = parent.className.replace(regex, '');

  // remove all Bee3D classes
  var isBare = this.options.selector === '.bee3D--slide';
  for (var i = 0; i < slides.length; i++) {
    slides[i].className = isBare ? 'bee3D--slide' : slides[i].className.replace(regex, '')
  }

  this.el.fire('destroy');

  // onDestroy callback
  this.options.onDestroy();
};
