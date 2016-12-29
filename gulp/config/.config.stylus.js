'use strict';
module.exports = function (C$, P$, bower) {
  const module_root = [P$.cwd, 'node_modules'];
  return {
    // Type: Array<String>
    // Target List to preprocess (allow Glob format).
    sources: [
      C$.GlobAll(C$.Join(P$.client.src, P$.client.css))
    ],
    // Type: Object
    // options for Stylus
    // https://github.com/jescalan/accord/blob/master/docs/stylus.md
    options: {
      include      : [
        // C$.Join(...module_root.concat('bootstrap-sass/assets/stylesheets'))
      ],
      compress     : true,
      'resolve url': true,
      // use          : [nib()],
      // import       : ['nib'],
    }
  }
};