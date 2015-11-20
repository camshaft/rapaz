var Storage = require('./storage');

module.exports = MemoryStore;

function MemoryStore(opts) {
  this.name = 'memory';
  var obj = {};
  Storage.call(this, {
    getItem: function(key) {
      return obj[key];
    },
    setItem: function(key, value) {
      obj[key] = value;
    },
    removeItem: function(key) {
      delete obj[key];
    }
  }, true, opts);
}
MemoryStore.prototype = Storage.prototype;
