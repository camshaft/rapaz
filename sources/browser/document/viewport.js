var merge = require('../../merge');
var window = require('../window');
var document = window.document;

module.exports = function() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  var w = e[a+'Width'];
  var h = e[a+'Height'];

  return merge({
    viewport: w ? [w, h] : undefined
  }, 'document');
};
