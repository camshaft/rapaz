var merge = require('../merge');
var navigator = require('./window').navigator;

module.exports = function() {
  return merge({
    languages: navigator.languages || [navigator.language || navigator.userLanguage]
  }, 'client');
};
