var uuid = require('uuid/v4');
var merge = require('../../merge');

module.exports = function(opts) {
  opts = opts || {};
  var store = opts.store;
  var cookie = opts.name || '_ses';
  var cookie_idx = cookie + '_idx';
  var ttl = opts.ttl || 30 * 60; // 30 minutes
  var id = store.get(cookie);
  var idx = parseInt(store.get(cookie_idx) || '-1', 10);

  if (!id) {
    id = uuid();
    idx++;
    store.set(cookie, id, ttl);
    store.set(cookie_idx, idx);
  }

  return merge({
    id: id,
    idx: idx
  }, 'session');
};
