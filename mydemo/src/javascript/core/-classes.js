module.exports = function(opts) {
  var baseClass = 'bee3D--';
  var isLoop = opts.loop.continuous;
  var loopOffset = opts.loop.offset;

  return function(slider) {
    var length = slider.slides.length;

    var addClass = function(el, cls) {
        classie.add(el, baseClass + cls);
      },

      removeClass = function(el, cls) {
        el.className = el.className.replace(new RegExp(baseClass + cls +'(\\s|$)', 'g'), ' ').trim();
      },

      deactivate = function(el, index) {
        var active = slider.slide(),
          offset = index - active,
          offsetClass = offset > 0 ? 'after' : 'before';

        if (isLoop) {
          var boundary = length-loopOffset-1;

          if (offset >= boundary) {
            offsetClass = 'before';
            offset = length-offset;
          }

          if (offset <= -boundary) {
            offsetClass = 'after';
            offset = length+offset;
          }
        }

        ['before(-\\d+)?', 'after(-\\d+)?', 'slide__active', 'slide__inactive'].map(removeClass.bind(null, el));

        if (index !== active) {
          ['slide__inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
        }
      };

    // add parent class if not already there
    addClass(slider.parent, 'parent');

    // add bee3D--slide class to all slides ONLY if options.selector was changed
    var isDefault = opts.slideSelector === '.bee3D--slide';
    if (!isDefault) slider.slides.map(function(el) { addClass(el, 'slide') });

    slider.on('activate', function(e) {
      slider.slides.map(deactivate);
      addClass(e.slide, 'slide__active');
      removeClass(e.slide, 'slide__inactive');
    });
  };
};
