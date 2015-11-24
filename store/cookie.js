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
    document.cookie = key + '=' + value + '; path=/; expires=' + (new Date(+new Date + ((typeof ttl === 'undefined' ? 63244800 : ttl) * 1000))).toUTCString();
  },
  isEnabled: require('../lib/browser/features/cookies')
};
