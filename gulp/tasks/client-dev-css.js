'use strict';
var cssnano    = require('cssnano')
  ;
module.exports = function (C$, gulp, gutil, $, runSequence, _) {

  var cssdev         = C$.client.css.dev
    , cssProd        = C$.client.css.prod
    , plumberOptions = {
        errorHandler: C$.errorHandler
      }
    ;

  gulp.task('prod-css-clean', function (callback) {
    C$.del(C$.GlobAll([cssProd]))
      .then(function (pathes) {
        // console.log(pathes);
        callback()
      });
  });

  gulp.task('dev-css-build', ['prod-css-clean'], function () {
    return gulp.src(C$.GlobAll(cssdev, 'css'), {base: cssdev})
      .pipe($.debug({title: 'dev-css'}))
      .pipe($.plumber(plumberOptions))
      .pipe($.postcss([
        cssnano()
      ]))
      .pipe(gulp.dest(cssProd))
      ;
  });

  gulp.task('dev-css', function (callback) {
    runSequence(
      ['dev-css-build'],
      ['dev-fonts'],
      callback
    );
  });
};