var Core = require('./core');

var classes  = require('./core/-classes');
var touches  = require('./core/-touches');
var changed  = require('./core/-changed');
// var scale   = require('./core/-scale');
var keys     = require('./core/-keys');
var defaults = require('./-defaults');

'use strict';

/**
 * Update [old] object with [newer] values
 * @return {obj}
 */
function deepMerge(target, src) {
  var array = Array.isArray(src);
  var dst = array && [] || {};

  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach(function(e, i) {
      if (typeof dst[i] === 'undefined') {
        dst[i] = e;
      } else if (typeof e === 'object') {
        dst[i] = deepMerge(target[i], e);
      } else {
        if (target.indexOf(e) === -1) {
          dst.push(e);
        }
      }
    });
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(function (key) {
        dst[key] = target[key];
      })
    }
    Object.keys(src).forEach(function (key) {
      if (typeof src[key] !== 'object' || !src[key]) {
        dst[key] = src[key];
      }
      else {
        if (!target[key]) {
          dst[key] = src[key];
        } else {
          dst[key] = deepMerge(target[key], src[key]);
        }
      }
    });
  }

  return dst;
};

/**
 * Bee3D Slider
 * @param {HTMLElement}    slider parent
 * @param {Object}         options (optional)
 */
function Bee3D( parent, options ) {
  this.options = deepMerge(defaults, options);

  this.init(parent);
}

Bee3D.prototype = {
  init: function(parent) {
    var opts = this.options,
      slides = parent.querySelectorAll( opts.selector );

    // create slider instance
    this.el = Core( slides );
    this.el.parent = parent;

    // init plugins
    this.plugins();

    // activate the first slide
    this.el.slide( this.options.focus );
    // assign effect to slider--parent
    classie.add(this.el.parent, 'bee3D--effect__'+this.options.effect);

    // initialize events
    this.events();
    this.slideEvents();

    // onInit callback
    this.options.onInit();

    // let ourselves know we've started
    return this.el.initialized = true;
  },

  plugins: function(){
    var self = this,
      opts = self.options,
      funcs = [
        classes(opts),
        changed(opts.onChange)
      ];

    // if turned on...
    if (opts.listeners.keys) funcs.push( keys() );
    if (opts.listeners.touches) funcs.push( touches() );

    // init plugin funcs
    (funcs || []).forEach(function(plugin){
      plugin(self.el);
    });
  },

  events: function(){
    var opts = this.options;

    if (opts.sync.enabled) this.sync();
    if (opts.ajax.enabled) this.ajax();
    if (opts.loop.enabled) this.loop();
    if (opts.autoplay.enabled) this.autoplay();
    if (opts.navigation.enabled) this.navigation();
    if (opts.listeners.scroll) this.mouseScroll();
    if (opts.listeners.drag) this.mouseDrag();
  },

  slideEvents: function(slides){
    var opts = this.options,
      slides = slides || this.el.slides;

    if (opts.shadows.enabled) this.shadows(slides);
    if (opts.parallax.enabled) this.parallax(slides);
    if (opts.listeners.clicks) this.clickInactives(slides);
  },

  sync: require('./features/sync'),
  ajax: require('./features/ajax'),
  loop: require('./features/loop'),
  shadows: require('./features/shadows'),
  autoplay: require('./features/autoplay'),
  navigation: require('./features/navigation'),
  parallax: require('./features/parallax'),

  clickInactives: require('./features/clickInactives'),
  mouseScroll: require('./features/mouseScroll'),
  mouseDrag: require('./features/mouseDrag'),

  destroy: require('./core/-destroy'),

  // --- helpers
  listenToHover: require('./features/autoplay/-listenToHover'),

};

// expose Bee3D globally
window.Bee3D = Bee3D;
