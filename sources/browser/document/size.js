var merge = require('../../merge');
var document = require('../window').document;

module.exports = function() {
  var doc = document.documentElement;
  var body = document.body;

  // document.body may not have rendered, so check whether be.offsetHeight is null
  var bodyHeight = body ? Math.max(body.offsetHeight, body.scrollHeight) : 0;
  var w = Math.max(doc.clientWidth, doc.offsetWidth, doc.scrollWidth);
  var h = Math.max(doc.clientHeight, doc.offsetHeight, doc.scrollHeight, bodyHeight);

  return merge({
    size: isNaN(w) || isNaN(h) ? undefined : [w, h]
  }, 'document');
};
