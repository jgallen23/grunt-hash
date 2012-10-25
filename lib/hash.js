
var crypto = require('crypto');

module.exports = function(source) {

  var md5sum = crypto.createHash('md5');

  md5sum.update(source);

  var d = md5sum.digest('hex');
  var hash = d.substr(0, 8);
  return hash;
};
