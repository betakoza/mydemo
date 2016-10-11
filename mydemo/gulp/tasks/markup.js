var gulp = require('gulp');
var config = require('../config').markup;
var browserSync  = require('browser-sync');
var fileinclude = require('gulp-file-include');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
