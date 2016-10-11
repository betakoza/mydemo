var AJAX = require('./-lib');

module.exports = function(){
  var self = this,
    opts = self.options.ajax,
    buffer = opts.when, // when 2nd to last slide from end
    path = opts.path, // URL to query
    remaining = opts.maxFetches, // cache # of times to query Path
    constructor = opts.constructor;

  var slides = self.el.slides,
    length = slides.length,
    slideClass = self.options.selector.substring(1), // bee3D selector, without the '.'

    handleActivate = function(event){
      if (length-buffer == event.index) {
        if (opts.maxFetches) {
          if (remaining>0) return fetchNew();
        } else {
          return fetchNew();
        }
      }
    },

    addItem = function(item){
      self.el.parent.appendChild( item );
      self.el.slides.push( item );
    },

    constructItems = function(data){
      var added = [];

      for (var i = 0; i < data.length; i++) {
        var item = document.createElement('section');
          item.className = slideClass;
          item.innerHTML = '<div class="bee3D--inner">' + constructor( data[i] ) + '</div>';

        // add item to new array of items
        added.push(item);

        // append new item to parent
        addItem(item);
      }

      // now update our cached length var
      length = self.el.slides.length;

      // attach events to new slides
      self.slideEvents( added );

      // decrease number of 'remaining' we have left
      if (opts.maxFetches) remaining--;

      // fire a fake 'activate' event, to trigger classes() plugin
      return self.el.touch();
    },

    fetchNew = function(){
      AJAX.init(path, function(statusCode, response) {
        return (statusCode==200) ? constructItems( JSON.parse(response).data ) : console.error( 'Error fetching new items!' );
      });
    };

  // listen to slide changes...
  this.el.on('activate', handleActivate);
};
