var merge = require('../../merge');
var window = require('../window');
var navigator = window.navigator;
var document = window.document;

module.exports = function(opts) {
  opts = opts || {};
  var cookieName = opts.name || 'cookietest';

  return merge({
    cookie: navigator.cookieEnabled || (function () {
      try {
        // Create cookie
        document.cookie = cookieName + '=1';
        var ret = document.cookie.indexOf(cookieName + '=') != -1;
        // Delete cookie
        document.cookie = cookieName + '=1; expires=' + (new Date(0));
        return ret;
      }
      catch (e) {
        return false;
      }
    })()
  }, ['client', 'features']);
};
