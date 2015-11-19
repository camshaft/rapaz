var merge = require('../merge');
var screen = require('./window').screen;

module.exports = function() {
  return merge({
    resolution: screen.width ? [screen.width, screen.height] : undefined
  }, 'client');
};
