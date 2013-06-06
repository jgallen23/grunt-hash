var getHash = require('./hash');
var path = require('path');
var fs = require('fs');

module.exports = function(grunt, cssDir, imgDir, bp) {
	
	//Hash images then loop over CSS files to replace image references with hashed values.
	var imageHash = {};
	var basePath = bp;

	grunt.file.expand(imgDir).forEach(function(file) {
	  
      //read file
      var source = fs.readFileSync(file, 'utf8');
      //get hash of file 
      var hash = getHash(source, 'utf8');
      //extension of file
      var ext = path.extname(file);
      //name minus extension
      var basename = path.basename(file, ext);
      //  name with hash
      var newFile = basename + '.' + hash + ext;
      //
      var newDir = path.relative(basePath, path.dirname(file));
   
      var newPath = newDir + '/' + newFile;
     
      imageHash[newDir +'/'+ basename + ext] = newPath;

  	});

	//Now loop over CSS and replace image names 
  	grunt.file.expand(cssDir).forEach(function(file2) {
      	
      	var s = fs.readFileSync(file2, 'utf8');

      	for (var i in imageHash) {
      		s = s.replace(i, imageHash[i], "gi");
      	}
      	
      	fs.writeFileSync(file2, s, 'utf8');

    });

};
