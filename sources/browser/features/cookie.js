var merge = require('../../merge');
var window = require('../window');
var navigator = window.navigator;
var document = window.document;

module.exports = function(opts) {
  opts = opts || {};
  var cookieName = opts.name || 'cookietest';

  return merge({
    cookie: require('../../../lib/browser/features/cookies')
  }, ['client', 'features']);
};
