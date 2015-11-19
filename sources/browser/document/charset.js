var merge = require('../../merge');
var document = require('../window').document;

module.exports = function() {
  return merge({
    charset: document.characterSet || document.charset
  }, 'document');
};
