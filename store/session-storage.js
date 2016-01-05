var Storage = require('./storage');

module.exports = SessionStorageStore;

function SessionStorageStore(opts) {
  this.name = 'sessionStorage';
  Storage.call(this, sessionStorage, opts);
}
Storage.extend(SessionStorageStore, {
  isEnabled: require('../lib/browser/features/session-storage')
});
