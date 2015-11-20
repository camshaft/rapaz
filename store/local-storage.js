var Storage = require('./storage');

module.exports = LocalStorageStore;

function LocalStorageStore(opts) {
  this.name = 'localStorage';
  Storage.call(this, localStorage, require('../lib/browser/features/local-storage'), opts);
}
LocalStorageStore.prototype = Storage.prototype;
