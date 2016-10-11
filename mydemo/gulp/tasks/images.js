var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config');
var browserSync  = require('browser-sync');

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jsonExamples', function(){
  return gulp.src(config.json.src)
    .pipe(gulp.dest(config.production.dest + '/assets'));
});
