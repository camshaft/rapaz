module.exports = CookieStore;

function CookieStore(domain) {
  this.domain = domain;
}

CookieStore.prototype = {
  name: 'cookie',
  get: function(key) {
    var pairs = document.cookie.split(/ *; */);
    if (pairs[0]) {
      for (var i = 0, pair; i < pairs.length; ++i) {
        pair = pairs[i].split('=');
        if (key == pair[0]) return pair[1];
      }
    }
  },
  set: function(key, value, ttl) {
    if (!this.domain) return this._fetchDomain(key, value, ttl);
    this._set(key, value, ttl);
  },
  _fetchDomain: function(key, value, ttl) {
    var hostname = location.hostname;
    var parts = hostname.split('.').reverse();

    if (parts.length === 1) {
      this.domain = hostname;
      return this._set(key, value, ttl);
    }

    for (var i = 2; i < parts.length; i++) {
      this.domain = '.' + parts.slice(0, i).reverse().join('.');
      this._set(key, value, ttl);
      if (this.get(key) === value) return;
    }
    this.domain = hostname;
    this._set(key, value, ttl);
  },
  _set: function(key, value, ttl) {
    var date = (new Date(+new Date + ((typeof ttl === 'undefined' ? 63244800 : ttl) * 1000))).toUTCString();
    document.cookie = key + '=' + value + '; path=/; expires=' + date + '; domain=' + this.domain;
  },
  isEnabled: require('../lib/browser/features/cookies')
};
