'use strict';
module.exports = function (C$, gulp, gutil, $, runSequence, _) {

  var fontsSrc = C$.client.fonts.src
    , fontsDev = C$.client.fonts.dev
    , fontExt  = ['woff', 'ttf', 'otf', 'eot', 'svg', 'svgz']
    ;


  gulp.task('src-fonts', function () {
    return gulp.src(fontExt.map(function (v) {
      return C$.GlobAll(fontsSrc, v)
    }), {base: fontsSrc})
      .pipe(gulp.dest(fontsDev))
      ;
  });

  gulp.task('src-fonts-watch', function () {
    gulp.watch(C$.GlobAll(fontsSrc), function (event) {
      return runSequence(
        ['src-fonts']
      );
    });
  });

};