var merge = require('../../merge');
var document = require('../window').document;

module.exports = function() {
  return merge({
    referrer: document.referrer
  }, 'document');
};
