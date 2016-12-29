'use strict';
// Include Gulp & Tools We'll Use
const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      $           = require('gulp-load-plugins')(),
      runSequence = require('run-sequence'),
      _           = require('lodash'),
      requireDir  = require('require-dir'),
      C$          = require('./gulp/config/main');

// shorthand if used gulp-watch
if ($.hasOwnProperty('watch')) {
  C$.watch = function (taskName, baseDir, extention) {
    extention = (extention) ? extention : '*';
    return $.watch('**/*.' + extention, {
      cwd       : baseDir,
      usePolling: true
    }, function (events, done) {
      console.log(arguments);
      gulp.start(taskName);
    });
  }
}

_.each(requireDir('./gulp/tasks'), function (v) {
  v(C$, gulp, gutil, $, runSequence, _);
});

gulp.task('watch', [
  'src-css-watch',
/*
  'src-html-watch',
  'src-pug-watch',
  'src-images-watch',
  'src-fonts-watch',
  'src-js-watch'
*/
]);

gulp.task('dev-build', function (callback) {
  runSequence(
    [
      'dev-env',
      'src-html',
      'src-images',
/*
      'src-pug',
      'src-js',
      'src-preserveFiles'
*/
    ], [
      'src-css'
    ],
    callback
  );
});

// SASS監視、テストサーバ起動
gulp.task('dev', function (callback) {
  runSequence(
    ['dev-build'], ['client-dev-browserSync'], ['watch'],
    callback
  );
});

// 配布ファイル作成
gulp.task('prod-build', function (callback) {
  runSequence(
    [
      'prod-env',
      'dev-html',
      'dev-images',
/*
      'dev-js',
      'dev-preserveFiles'
*/
    ], [
      'dev-css'
    ],
    callback
  );
});

gulp.task('build', function (callback) {
  runSequence(
    ['dev-build'], ['prod-build'],
    callback
  );
});

// 配布ファイル確認
gulp.task('prod', function (callback) {
  runSequence(
    [
      'prod-build'
    ], ['client-prod-browserSync'],
    callback
  );
});

// デフォルト定義
gulp.task('default', ['dev']);