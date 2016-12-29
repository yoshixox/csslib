'use strict';
var BrowserSync = require('browser-sync')
  ;
module.exports  = function (C$, gulp, gutil, $, runSequence, _) {
  var Reload      = BrowserSync.reload
    , Sync        = function (dirs) {
        return BrowserSync({
          notify: true,
          debug : true,
          server: {
            baseDir: dirs,
            port   : C$.ports.browserSync.dev
          }
        })
      }
    ;
  gulp.task('client-dev-browserSync', function () {
    Sync([C$.client.root.dev]);
  });
  gulp.task('client-prod-browserSync', function () {
    Sync([C$.client.root.prod]);
  });
  gulp.task('client-browserSync-reload', function () {
    Reload();
  });
};