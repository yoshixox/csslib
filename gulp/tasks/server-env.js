'use strict';
module.exports = function (C$, gulp, gutil, $, runSequence, _) {

  gulp.task('dev-env', function (callback) {
    process.env.NODE_ENV = 'development';
    $.env({vars: C$.env.dev});
    callback();
  });
  gulp.task('prod-env', function (callback) {
    process.env.NODE_ENV = 'production';
    $.env({vars: C$.env.prod});
    callback();
  });
}
;