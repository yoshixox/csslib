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
    // options for Less
    // https://github.com/plus3network/gulp-less
    options: {
      paths: [
        // C$.Join(...module_root.concat('bootstrap-sass/assets/stylesheets'))
      ]
    }
  };
};