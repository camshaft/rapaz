var merge = require('../../merge');
var location = require('../window').location;

module.exports = function() {
  return merge({
    url: location.href
  }, 'document');
};
