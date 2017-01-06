var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var info = require('./info.js');

gulp.task('cop', function () {
  if (info.url === '') {
    console.log("No URL!!!");
  } else {
    return gulp.src('wdio.conf.js').pipe(webdriver());
  }
});
