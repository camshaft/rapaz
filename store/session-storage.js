var Storage = require('./storage');

module.exports = SessionStorageStore;

function SessionStorageStore(opts) {
  this.name = 'sessionStorage';
  Storage.call(this, sessionStorage, require('../lib/browser/features/session-storage'), opts);
}
SessionStorageStore.prototype = Storage.prototype;
