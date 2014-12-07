/*
 * gulp.js plugin for ngBoba
 */
var through2 = require('through2');
var path = require('path');
var addBoba = require('ng-boba');

module.exports = function (output, options) {
  'use strict';
  var firstFile, sourcePaths = [];

  function collectFile(file, enc, cb) {
    /*
     * Process each file in the stream.
     */
    if (file.isNull()) {
      return cb();
    }
    if (!firstFile) {
      firstFile = file;
    }
    sourcePaths.push(path.relative(process.cwd(), file.path));
    return cb();
  }

  function pourBoba(cb) {
    /*
     * Run the files through ngBoba, throw the result into the stream
     */
    var outputFile;
    if (!firstFile) {  // empty configuration would be better
      return cb();
    }
    options.files = sourcePaths;
    outputFile = firstFile.clone({contents: false});
    outputFile.path = path.join(firstFile.base, output);
    return addBoba(options).then((function (fileStream) {
      return function (bobaData) {
        outputFile.contents = new Buffer(JSON.stringify(bobaData, null, '\t'));
        fileStream.push(outputFile);
      };
    }(this))).then(cb);
  }

  return through2.obj(collectFile, pourBoba);
};
