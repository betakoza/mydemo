var gulp      = require('gulp');
var config    = require('../config').production;
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.dest + '/bee3D.css')

    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rename({ extname: '.min.css' }))
    
    .pipe(gulp.dest(config.dest));
})
