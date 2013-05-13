/*
 * grunt-hash
 * https://github.com/jgallen23/grunt-hash
 *
 * Copyright (c) 2012 Greg Allen
 * Licensed under the MIT license.
 */

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
    var basePath = options.basePath || "";
    var flatten = (options.flatten === false ? false : true);
    console.log("options.flatten " + options.flatten);
    options.dest = options.dest || '';
    var map = {};

    if (!fs.existsSync(options.dest)) {
      fs.mkdirSync(options.dest);
    }

    grunt.file.expand(options.src).forEach(function(file) {
      //read file
      var source = fs.readFileSync(file, 'utf8');
      //get hash of file 
      var hash = getHash(source, 'utf8');
      //extension of file
      var ext = path.extname(file);
      //name minus extension
      var basename = path.basename(file, ext);
      //  name with hash
      var newFile = basename+'.'+hash+ext;

      var newPath;
      if (flatten === false) {
        var newDir = path.relative(basePath, path.dirname(file));
        var n=newDir.split("/"); 
        var rp = options.dest;

        for (var i = 0; i < n.length; i++) {
          rp = rp + n[i];
          if (!fs.existsSync(rp)) {
            fs.mkdirSync(rp);
          } 
          rp = rp + '/';
        }
        if (!fs.existsSync(options.dest + newDir))  { fs.mkdirSync(options.dest + newDir); }

        newPath = options.dest + newDir + '/' + newFile;    
      }
      else {
        newPath = options.dest + newFile; 
      }
      //
      if (!fs.existsSync(newPath)) {
        fs.writeFileSync(newPath, source);
        grunt.log.writeln('Generated: '+newPath);
      } else {
        grunt.log.writeln('Skipping: '+newPath);
      }
      if (flatten === false) {
        map[options.dest + newDir + '/' + basename+ext] = options.dest + newDir + '/' + newFile;
      }
      else {
        map[options.dest + '/' + basename+ext] = options.dest + '/' + newFile;
      }
      
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
