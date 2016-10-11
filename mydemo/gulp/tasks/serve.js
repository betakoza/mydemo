var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browserSync;

gulp.task('serve', function() {
  browserSync(config);
});
