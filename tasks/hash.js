/*
 * grunt-hash
 * https://github.com/jgallen23/grunt-hash
 *
 * Copyright (c) 2012 Greg Allen
 * Licensed under the MIT license.
 */

function unixify(path) {
  return path.split('\\').join('/');
}

module.exports = function(grunt) {
  var path = require('path');
  var getHash = require('../lib/hash');

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('hash', 'Append a unique hash to tne end of a file for cache busting.', function() {
    var options = this.options({
      srcBasePath: "",
      destBasePath: "",
      flatten: false,
      hashLength: 8,
      hashFunction: getHash,
      hashSeparator: '.',
      removeSource: false
    });
    var map = {};
    var mappingExt = path.extname(options.mapping);

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {

        if (grunt.file.isDir(src)) {
          return;
        }

        var source = grunt.file.read(src);
        var hash = options.hashFunction(source, 'utf8').substr(0, options.hashLength);
        var destPath = path.dirname(file.dest);
        var ext = path.extname(src);
        var basename = path.basename(src, ext);

        var newFile = basename + (hash ? options.hashSeparator + hash : '') + ext;
        var outputPath = path.join(destPath, newFile);

        var key = path.relative(file.orig.dest, file.dest);
        var outKey = path.relative(file.orig.dest, outputPath);

        grunt.file.copy(src, outputPath);
        grunt.log.writeln('Generated: ' + outputPath);

        map[unixify(key)] = unixify(outKey);

        if (options.removeSource) {
          grunt.file.delete(src);
        }
      });
    });

    if (options.mapping) {
      var output = '';

      if (mappingExt === '.php') {
        output = "<?php return json_decode('" + JSON.stringify(map) + "'); ?>";
      } else {
        output = JSON.stringify(map, null, "  ");
      }

      grunt.file.write(options.mapping, output);
      grunt.log.writeln('Generated mapping: ' + options.mapping);
    }

  });
};
