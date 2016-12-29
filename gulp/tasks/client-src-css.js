'use strict';
var Autoprefixer = require('autoprefixer'),
    Buffer       = require('vinyl-buffer'),
    Cssnano      = require('cssnano');
module.exports   = function (C$, gulp, gutil, $, runSequence, _) {

  var cssSrc         = C$.client.css.src
    , cssSrcGlob     = C$.Join(cssSrc, '**', '!(_)*' + C$.CSS.type)
    , cssdev         = C$.client.css.dev
    , cssWatch       = [cssSrcGlob]
    , preprocess     = {
    'sass': $.sass,
    'scss': $.sass,
    'less': $.less,
    'styl': $.stylus
  }
    , plumberOptions = {
    errorHandler: C$.errorHandler
  }
    , sourceMapInit  = {
    loadMaps: true,
    debug   : true
  }
    , sourceMapWrite = {
    addComment    : true,
    includeContent: true,
    sourceRoot    : '/' + cssSrc,
    //debug         : true
  };

  gulp.task('dev-css-clean', function (callback) {
    C$.del(C$.GlobAll([cssdev]))
      .then(function (pathes) {
        callback()
      });
  });

  gulp.task('src-css-build', function () {
    return gulp.src(cssSrcGlob, {
      base: cssSrc
    })
      .pipe($.debug({
        title: 'src-css'
      }))
      .pipe($.plumber(plumberOptions))
      .pipe($.sourcemaps.init(/*sourceMapInit*/))
      .pipe(preprocess[C$.CSS.type](C$.CSS.options))
      .pipe($.postcss([
        Autoprefixer(C$.CSS.autoprefixer),
        Cssnano()
      ]))
      .pipe($.sourcemaps.write('.', sourceMapWrite))
      .pipe(gulp.dest(cssdev));
  });

  gulp.task('src-css-copy', function () {
    return gulp.src(C$.GlobAll(cssSrc, 'css'), {
      base: cssSrc
    })
      .pipe($.debug({
        title: 'src-css-copy'
      }))
      .pipe($.plumber())
      .pipe(gulp.dest(cssdev));
  });

  gulp.task('src-css', function (callback) {
    runSequence(
      'dev-css-clean',
      'src-css-build',
      'src-css-copy',
      'src-fonts',
      callback
    );
  });

  gulp.task('src-css-watch', function () {
    gulp.watch(C$.GlobAll(cssWatch), {
      cwd: './'
    }, function (event) {
      return runSequence(
        ['src-css']
      );
    });
  });
};