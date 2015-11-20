var imurmurhash = require('imurmurhash');
var encode = require('../lib/base64').encode;

module.exports = Storage;

function Storage(obj, isEnabled, opts) {
  opts = opts || {};
  this.isEnabled = isEnabled;
  this.o = obj;
  this.p = opts.prefix || '';
}

Storage.prototype = {
  get: function(key) {
    var obj = this.o;
    key = this.key(key);
    var res = obj.getItem(key);
    if (res) {
      var parts = res.split(/^(\d+)\|/);
      if (parts.length != 3) return undefined;
      if (parts[1] == '0' || parseInt(parts[1]) > now()) return parts[2]
      obj.removeItem(key);
    }
  },
  set: function(key, value, ttl) {
    this.o.setItem(this.key(key), (ttl ? now(ttl) : '0') + '|' + value);
  },
  key: function(key) {
    return '_' + encode(imurmurhash(this.p).hash(key).result());
  }
};

function now(seconds) {
  return Math.floor(new Date / 1000) + (seconds || 0);
}
