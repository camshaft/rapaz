var merge = require('../merge');
var window = require('./window');

module.exports = function() {
  return merge({
    cpuClass: window.navigator.cpuClass
  }, 'client');
};
