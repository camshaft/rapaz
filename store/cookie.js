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
    var revHost = location.hostname.split('.').reverse();

    // localhost
    if(revHost.length === 1) {
      document.cookie = key + '=' + value + '; path=/; expires=' + date + '; domain=' + location.hostname;
    } else {
      var domainParts = [];

      // move backward through hostname, until cookie is successfully set. This addresses TLD's such as google.com.br
      for(var i=0; i<revHost.length; i++){
        if(CookieStore.prototype.get(key) == null || CookieStore.prototype.get(key) != value) {
          domainParts.unshift(revHost[i]);
          document.cookie = key + '=' + value + '; path=/; expires=' + date + '; domain=.' + domainparts.join('.');
        }
      }
    }
  },
  isEnabled: require('../lib/browser/features/cookies')
};

