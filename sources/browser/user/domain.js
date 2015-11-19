var uuid = require('uuid').v4;
var merge = require('../../merge');

module.exports = function(opts) {
  opts = opts || {};
  var store = opts.store;
  var cookie = opts.name || '_did';
  var id = store.get(cookie);

  if (!id) {
    id = uuid();
    store.set(cookie, id);
  }

  return merge({
    domain_id: id
  }, 'user');
};
