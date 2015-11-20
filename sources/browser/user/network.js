var store = require('./store');

module.exports = function(opts) {
  return store({
    store: opts.store,
    target: 'network_id',
    name: opts.name || '_nid'
  })
};
