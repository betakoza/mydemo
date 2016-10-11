var gulp    = require('gulp');
var config  = require('../config').production;
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');

// https://github.com/mishoo/UglifyJS2#compressor-options
var opts = {
  compress: {
    conditionals: true,
    comparisons: true,
    booleans: true,
    loops: true,
    unused: true,
    join_vars: true,
    drop_console: true,
  }
};

gulp.task('uglifyJs', ['browserify'], function() {
  return gulp.src(config.dest + '/bee3D.js')
    .pipe(gulp.dest(config.dest))

    .pipe(uglify(opts))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.dest));
});
