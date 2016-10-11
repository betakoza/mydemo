var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');

function runStylesOn(file, dest){
  return gulp.src( file )
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 5 version'] }))
    .pipe(gulp.dest( dest ))
    .pipe(browserSync.reload({stream:true}));
}

gulp.task('sass', function () {
  runStylesOn(config.src+'/demo.sass', config.dest + '/assets/css');
  runStylesOn(config.src+'/bee3D.sass', config.dest);
});
