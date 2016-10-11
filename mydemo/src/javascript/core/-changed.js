module.exports = function(cb){
  return function(slider){
    slider.on('activate', function(e) {
      if (slider.initialized) return cb(e);
    });
  };
};
