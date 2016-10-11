module.exports = function( slides ) {
  var slides = [].slice.call( slides ),
    activeSlide = slides[-1],
    listeners = {},

    getActiveIndex = function(){
      return slides.indexOf(activeSlide);
    },

    touch = function(customData){
      return fire('activate', createEventData(activeSlide, customData));
    },

    activate = function(index, customData) {
      if (!slides[index]) return;

      fire('deactivate', createEventData(activeSlide, customData));
      activeSlide = slides[index];

      touch(customData);
    },

    slide = function(index, customData) {
      var activeIndex = getActiveIndex();

      // if already on this slideIndex, do nothing
      if (activeIndex==index) return;

      if (arguments.length) {
        fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
      } else {
        return activeIndex;
      }
    },

    step = function(offset, customData) {
      var slideIndex = slides.indexOf(activeSlide) + offset;

      fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
    },

    on = function(eventName, callback) {
      (listeners[eventName] || (listeners[eventName] = [])).push(callback);

      return function() {
        listeners[eventName] = listeners[eventName].filter(function(listener) {
          return listener !== callback;
        });
      };
    },

    fire = function(eventName, eventData) {
      return (listeners[eventName] || [])
        .reduce(function(notCancelled, callback) {
          return notCancelled && callback(eventData) !== false;
        }, true);
    },

    createEventData = function(el, eventData) {
      eventData = eventData || {};
      eventData.index = slides.indexOf(el);
      eventData.slide = el;
      return eventData;
    };

  // return the slider object
  return {
    on: on,
    fire: fire,
    touch: touch,
    slide: slide,
    next: step.bind(null, 1),
    prev: step.bind(null, -1),
    slides: slides
  };
};
