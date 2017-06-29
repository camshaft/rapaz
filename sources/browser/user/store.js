var uuid = require('uuid/v4');
var merge = require('../../merge');

module.exports = function(opts) {
  var store = opts.store;
  var target = opts.target;
  var cookie = opts.name;
  var id = store.get(cookie);

  if (!id) {
    id = uuid();
    store.set(cookie, id);
  }

  var obj = {};
  obj[target] = id;

  return merge(obj, 'user');
};
