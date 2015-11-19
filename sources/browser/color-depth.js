var merge = require('../merge');
var window = require('./window');

module.exports = function() {
  return merge({
    colorDepth: window.screen.colorDepth
  }, 'client');
};
