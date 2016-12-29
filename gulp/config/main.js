'use strict';
const fs     = require('fs')
  , C$       = require('./constants.js')
  , packages = require('../../package.json')
  ;
let P$       = require('../../.config.js')
  ;

P$.cwd = process.cwd();

/*
 P$.libs = {};
 if (packages.hasOwnProperty('dependencies')) {
 Object.keys(packages.dependencies).forEach(function (v) {
 P$.libs[v] = require(C$.Join(cwd, 'node_modules', v, 'package.json'));
 }, packages);
 }
 */

var CSSConfig = {
      sass: require('./.config.sass.js')(C$, P$),
      scss: require('./.config.scss.js')(C$, P$),
      styl: require('./.config.stylus.js')(C$, P$),
      less: require('./.config.less.js')(C$, P$),
    }
  , CSS       = {
      type        : P$.cssType,
      sources     : CSSConfig[P$.cssType].sources,
      options     : CSSConfig[P$.cssType].options,
      autoprefixer: require('./.config.autoprefixer.js')
    }
  , HTML      = {
      htmlmin: require('./.config.htmlmin.js'),
      pug    : require('./.config.pug.js')
    }
  ;

module.exports = {
  client      : {
    root         : P$.client,
    css          : {
      src : C$.Join(P$.client.src, P$.client.css),
      dev : C$.Join(P$.client.dev, P$.client.css),
      prod: C$.Join(P$.client.prod, P$.client.css)
    },
    images       : {
      src : C$.Join(P$.client.src, P$.client.images),
      dev : C$.Join(P$.client.dev, P$.client.images),
      prod: C$.Join(P$.client.prod, P$.client.images)
    },
    sprites      : {
      src: C$.Join(P$.client.src, P$.client.sprites),
      /*
       dev : C$.Join(P$.client.dev, P$.client.sprites),
       prod: C$.Join(P$.client.prod, P$.client.sprites)
       */
    },
    js           : {
      src : C$.Join(P$.client.src, P$.client.js),
      dev : C$.Join(P$.client.dev, P$.client.js),
      prod: C$.Join(P$.client.prod, P$.client.js)
    },
    fonts        : {
      src : C$.Join(P$.client.src, P$.client.fonts),
      dev : C$.Join(P$.client.dev, P$.client.fonts),
      prod: C$.Join(P$.client.prod, P$.client.fonts)
    },
    preserveFiles: P$.client.preserveFiles
  },
  server      : {
    root: P$.server,
  },
  cwd         : P$.cwd,
  test        : P$.test,
  ports       : P$.ports,
  HTML        : HTML,
  CSS         : CSS,
  Join        : C$.Join,
  del         : C$.del,
  GlobAll     : C$.GlobAll,
  errorHandler: C$.errorHandler,
  org         : P$,
  env         : P$.env
};