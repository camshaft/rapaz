var store = require('./store');

module.exports = function(opts) {
  return store({
    store: opts.store,
    target: 'domain_id',
    name: opts.name || '_did'
  })
};
