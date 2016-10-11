var gulp    = require('gulp');
var config  = require('../config');
var del     = require('del');

// Run this to compress all the things!
gulp.task('production', ['uglifyJs', 'images', 'jsLibs', 'jsonExamples', 'markup', 'minifyCss'], function(){
  del([
    config.markup.dest+'/-head.html',
    config.markup.dest+'/-slides.html',
    config.markup.dest+'/-arrows.html'
  ])
});
