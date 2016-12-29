'use strict';
module.exports = {
  // server:
  // path to server files root
  server : {
    src : 'server.src',
    dev : 'server.dev',
    prod: 'server.prod',
  },
  // client:
  // path to client files root
  client : {
    src          : 'demo',
    dev          : 'client.dev',
    prod         : 'client.prod',
    // css:
    // images:
    // sprites:
    // js:
    // fonts:
    // relative path from root to above files
    css          : 'css',
    images       : 'images',
    sprites      : 'sprites',
    js           : 'js',
    fonts        : 'css/fonts',
    // preserveFiles:
    // Files to keep without compiling. Allow entry to be a glob pattern
    preserveFiles: []
  },
  // cssType:
  // CSS preprocessor to use
  // 'sass','scss','less','styl'
  cssType: 'styl',
  // test:
  // path to test files root
  test   : 'test',
  // ports:
  // Ports used by development module
  ports  : {
    inspector  : {
      web  : 8000,
      debug: 5858
    },
    browserSync: {
      dev : 3000,
      prod: 3002
    }
  },
  // env:
  // Environmental variables
  env    : {
    dev : {},
    prod: {}
  }
};