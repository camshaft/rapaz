var merge = require('../../merge');
var window = require('../window');
var navigator = window.navigator;

// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
// https://github.com/Modernizr/Modernizr/issues/548

module.exports = function() {
  return merge({
    maxTouchPoints: !!(navigator.maxTouchPoints || navigator.msMaxTouchPoints),
    touchEvent: !!(function() {
      try {
        return document.createEvent("TouchEvent");
      } catch(_) { /* squelch */ }
    })(),
    touchStart: 'ontouchstart' in window
  }, ['client', 'features', 'touch']);
};
