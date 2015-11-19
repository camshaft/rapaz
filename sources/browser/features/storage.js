var merge = require('../../merge');
var window = require('../window');

module.exports = function(name) {
  var obj = {};
  obj[name] = (function () {
    try {
      return !!window[name];
    } catch(e) {
      return true; // SecurityError when referencing it means it exists
    }
  })()
  return merge(obj, ['client', 'features']);
};
