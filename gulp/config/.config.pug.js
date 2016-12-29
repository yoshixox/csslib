'use strict';
module.exports = {
  //filename: string
  //The name of the file being compiled. Used in exceptions, and required for relative includes and extends.
  // Defaults to 'Pug'.
  // To change opts.filename use gulp-rename before gulp-pug

  // basedir: string The
  // root directory of all absolute inclusion.

  // doctype: string
  // If the doctype is not specified as part of the template, you can specify it here.
  // It is sometimes useful to get self-closing tags and remove mirroring of boolean attributes;
  // see doctype documentation for more information.

  // pretty: boolean
  // | string Adds whitespace to the resulting HTML to make it easier for a human to read using '  ' as indentation. If a string is specified, that will be used as indentation instead (e.g. '\t').
  // Defaults to false.

  // filters: object
  // Hash table of custom filters. Defaults to undefined.

  // self:boolean
  // Use a self namespace to hold the locals. It will speed up the compilation,
  // but instead of writing variable you will have to write self.variable to access a property of the locals object.
  // Defaults to false.

  // debug: boolean
  // If set to true, the tokens and function body are logged to stdout.

  // compileDebug: boolean
  // If set to true, the function source will be included in the compiled template for better error messages (sometimes useful in development).
  // It is enabled by default unless used with Express in production mode.
  compileDebug: true,

  // globals: Array<string>
  // Add a list of global names to make accessible in templates.

  // cache: boolean
  // If set to true, compiled functions are cached. filename must be set as the cache key. Only applies to render functions. Defaults to false.
  cache: true,

  // inlineRuntimeFunctions: boolean
  // Inline runtime functions instead of require-ing them from a shared version.
  // For compileClient functions, the default is true so that one does not have to include the runtime.
  // For all other compilation or rendering types, the default is false.

  // name: string
  // The name of the template function. Only applies to compileClient functions. Defaults to 'template'.

  // locals: Object
  // Locals to compile the Pug with.
  // You can also provide locals through the data field of the file object, e.g. with gulp-data.
  // They will be merged with opts.locals.

  // client: Boolean
  // Compile Pug to JavaScript code.

  // pug:
  // A custom instance of Pug for gulp-pug to use.
};