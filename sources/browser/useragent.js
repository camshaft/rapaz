var merge = require('../merge');
var window = require('./window');

module.exports = function() {
  return merge({
    useragent: window.navigator.userAgent
  }, 'client');
};
