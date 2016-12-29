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
    // options for Scss
    // https://github.com/sass/node-sass#options
    options: {
      // includePaths:
      // Type: Array<String>
      // An array of paths that LibSass can look in to attempt to resolve
      // your @import declarations. When using data, it is recommended that
      // you use this.
      includePaths: [
        // C$.Join(...module_root.concat('bootstrap-sass/assets/stylesheets'))
      ],
      // outputStyle :
      // Values: nested, expanded, compact, compressed
      outputStyle : 'compressed',
    }
  };
};