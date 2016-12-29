'use strict';
const path  = require('path')
  , del   = require('del')
  , _     = require('lodash')
  , gutil = require('gulp-util')
  ;

const Join = path.join;

module.exports = {
  Join        : Join,
  del         : del,
  GlobAll     : function (arrayOrTxt, extension) {
    var ext = (extension) ? '.' + extension : '.*'
      , src = arrayOrTxt
      ;
    if (_.isString(src)) {
      return Join(src, '**', '*' + ext)
    }
    if (_.isArray(src)) {
      return _.map(src, function (v) {
        return Join(v, '**', '*' + ext)
      })
    }
  },
  errorHandler: function (e) {
    gutil.log(
      'Error at',
      '\'' + gutil.colors.cyan(e.plugin) + '\'',
      gutil.colors.yellow(e.message)
    );
  }
};