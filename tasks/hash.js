/*
 * grunt-hash
 * https://github.com/jgallen23/grunt-hash
 *
 * Copyright (c) 2012 Greg Allen
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('hash', 'Append a unique hash to tne end of a file for cache busting.', function() {
    grunt.config.requires(['hash', 'src']);
    var fs = require('fs');
    var path = require('path');
    fs.existsSync = fs.existsSync || path.existsSync;
    var getHash = require('../lib/hash');

    var options = grunt.config('hash');
    options.dest = options.dest || '';
    var map = {};

    if (!fs.existsSync(options.dest)) {
      fs.mkdirSync(options.dest);
    }

    grunt.file.expand(options.src).forEach(function(file) {

      var source = fs.readFileSync(file, 'utf8');
      var hash = getHash(source, 'utf8');
      var ext = path.extname(file);
      var basename = path.basename(file, ext);

      var newFile = basename+'.'+hash+ext;
      var newPath = path.join(options.dest, newFile);

      if (!fs.existsSync(newPath)) {
        fs.writeFileSync(newPath, source);
        grunt.log.writeln('Generated: '+newPath);
      } else {
        grunt.log.writeln('Skipping: '+newPath);
      }
      map[basename+ext] = newFile;
    });
    if (options.mapping) {
      var mappingExt = path.extname(options.mapping);
      var mappingPath = path.dirname(options.mapping);
      var out = JSON.stringify(map);
      if (mappingExt == '.php') {
        out = "<?php return json_decode('"+out+"'); ?>";
      }
      if (!fs.existsSync(mappingPath)) {
        fs.mkdirSync(mappingPath);
        grunt.log.writeln('Generated: '+mappingPath);
      }
      fs.writeFileSync(options.mapping, out);
      grunt.log.writeln('Generated mapping: '+options.mapping);
    }

  });



};
