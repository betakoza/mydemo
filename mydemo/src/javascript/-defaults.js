module.exports = {
  // main wrapper, watches for gestures
  wrapper: document.body,
  // slides' selector class
  selector: '.bee3D--slide',
  // scroll class to apply: coverflow|classic|cube|carousel|concave|wave|arc|spiral-left|spiral-right
  effect: 'coverflow',
  // slide to focus on init
  focus: 0,
  listeners: {
    keys: false, // keyboard keys
    touches: false, // touch/swipe (mobile)
    clicks: false, // click non-active slides to show
    scroll: false, // mouse scroll wheel
    drag: false, // mouse drag/swipe
  },
  navigation: {
    enabled: false,
    next: '.bee3D--nav__next',
    prev: '.bee3D--nav__prev'
  },
  ajax: {
    // use ajax calls?
    enabled: false,
    // API url to query
    path: null,
    // when to make the request? eg: 2nd to last slide
    when: 2,
    // max # of times to query this path/URL
    // null == infinite fetches
    maxFetches: null, 
    // use data attributes to build new slides
    constructor: function(data){
      return '<p>'+data.content+'</p>';
    }
  },
  autoplay: {
    // use autoplay ?
    enabled: false,
    // autoplay time (ms) per slide
    speed: 5000,
    // pause autoplay on hover ?
    pauseHover: false,
  },
  loop: {
    // loop to start ?
    enabled: false,
    // continuous loop effect ?
    continuous: false,
    // # of slides to offset to make loop seem infinite
    // different for each effect
    offset: 2
  },
  sync: {
    enabled: false,
    targets: []
  },
  parallax: {
    // use parallax effect ?
    enabled: false,
    // class name to add
    className: 'bee3D--parallax',
    // data-depth
    friction: 0.7,
    // parallax library settings
    settings: {
      relativeInput: true,
      clipRelativeInput: true,
      calibrateX: true,
      calibrateY: true,
      scalarX: 4.0,
      scalarY: 5.0,
      frictionX: 0.1,
      frictionY: 0.1
    }
  },
  shadows: {
    // cast shadows under slides?
    enabled: false,
    // HTML to add
    template: [
      '<div class="bee3D--shadow-wrapper">',
        '<div class="bee3D--shadow">',
          '<span></span>',
        '</div>',
      '</div>'
    ].join('')
  },
  // callbacks
  onInit: function() {},
  onChange: function() {},
  onDestroy: function() {}
};
