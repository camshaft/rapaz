var Memory = require('./memory');

module.exports = function(stores, enabled) {
  enabled = enabled || ['cookie', 'localStorage', 'sessionStorage'];
  for (var i = 0, store; i < enabled.length; i++) {
    store = enabled[i];
    if (!store) continue;
    store = stores[store] || store;
    if (store.isEnabled) return store;
  };
  return new Memory();
};
