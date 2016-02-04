module.exports = CookieStore;

function CookieStore() {

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
    var date = (new Date(+new Date + ((typeof ttl === 'undefined' ? 63244800 : ttl) * 1000))).toUTCString();
    var domainParts = location.host.split('.');
    domainParts.shift();
    var domain = '.' + domainParts.join('.');
    document.cookie = key + '=' + value + '; path=/; expires=' + date + '; domain=' + domain;
  },
  isEnabled: require('../lib/browser/features/cookies')
};
