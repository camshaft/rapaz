var merge = require('../merge');
var window = require('./window');

module.exports = function() {
  return merge({
    doNotTrack: window.navigator.doNotTrack
  }, 'client');
};
