module.exports = CookieStore;

function CookieStore(domain) {
  this.domain = domain || undefined;
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
    if (typeof this.domain === 'undefined') return this._fetchDomain(key, value, ttl);
    this._set(key, value, ttl);
  },
  _fetchDomain: function(key, value, ttl) {
    var hostname = location.hostname;
    var parts = hostname.split('.');

    for (var i = parts.length - 2; i >= 0; i--) {
      this.domain = '.' + parts.slice(i, parts.length).join('.');
      this._set(key, value, ttl);
      if (this.get(key) === value) return;
    }
    this.domain = false;
    this._set(key, value, ttl);
  },
  _set: function(key, value, ttl) {
    var date = (new Date(+new Date + ((typeof ttl === 'undefined' ? 63244800 : ttl) * 1000))).toUTCString();
    var domain = this.domain;
    document.cookie = key + '=' + value + '; path=/; expires=' + date + (domain ? '; domain=' + domain : '');
  },
  isEnabled: require('../lib/browser/features/cookies')
};
