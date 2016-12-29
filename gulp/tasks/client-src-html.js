'use strict';
module.exports = function (C$, gulp, gutil, $, runSequence, _) {
  var rootSrc        = C$.client.root.src,
      rootDev        = C$.client.root.dev
    , plumberOptions = {
        errorHandler: C$.errorHandler
      }
    ;
  gulp.task('dev-html-clean', function (callback) {
    C$.del(C$.GlobAll([rootDev], 'html'))
      .then(function (pathes) {
        // console.log(pathes);
        callback()
      });
  });
  gulp.task('src-html', ['dev-html-clean'], function () {
    return gulp.src(C$.GlobAll(rootSrc, 'html'), {base: rootSrc})
      .pipe($.debug({title: 'src-html'}))
      .pipe($.plumber(plumberOptions))
      .pipe($.htmlmin(C$.HTML.htmlmin))
      .pipe(gulp.dest(rootDev))
      ;
  });

  gulp.task('src-html-watch', function () {
    gulp.watch(C$.GlobAll(rootSrc, 'html'), function (event) {
      return runSequence(
        ['src-html']
      );
    });
  });
};