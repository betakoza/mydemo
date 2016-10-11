var gulp    = require('gulp');
var size    = require('gulp-filesize');
var uglify  = require('gulp-uglify');
var config  = require('../config');

function jslibs(dest){
  dest = dest || config.jsLibs.dest;

  return gulp.src( config.jsLibs.src )
    .pipe(uglify())
    .pipe(gulp.dest( dest ))
    .pipe(size());
};

gulp.task('jsLibs', function(){
  jslibs( config.production.dest + '/dependencies' );
});

