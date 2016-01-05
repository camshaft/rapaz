var Storage = require('./storage');

module.exports = LocalStorageStore;

function LocalStorageStore(opts) {
  this.name = 'localStorage';
  Storage.call(this, localStorage, opts);
}
Storage.extend(LocalStorageStore, {
  isEnabled: require('../lib/browser/features/local-storage')
});
