var merge = require('../../merge');
var document = require('../window').document;

module.exports = function() {
  var title = document.title;

  if (typeof title !== 'string') {
    var tags = document.getElementsByTagName('title');
    title = tags[0] && tags[0].text;
  }

  return merge({
    title: title
  }, 'document');
};
