var Rapaz = require('..');

var stores = {
  cookie: new (require('../store/cookie'))(),
  localStorage: new (require('../store/local-storage'))(),
  memory: new (require('../store/memory'))(),
  sessionStorage: new (require('../store/session-storage'))()
};

module.exports = function Tracker() {
  var store = (require('../store'))(stores);
  return Rapaz()
    .use(
      require('../sources/id')(),
      require('../sources/timestamp')(),
      require('../sources/browser/adblock')(),
      require('../sources/browser/color-depth')(),
      require('../sources/browser/do-not-track')(),
      require('../sources/browser/languages')(),
      require('../sources/browser/plugins')(),
      require('../sources/browser/resolution')(),
      require('../sources/browser/timezone')(),
      require('../sources/browser/useragent')(),
      require('../sources/browser/document/charset')(),
      require('../sources/browser/document/referrer')(),
      require('../sources/browser/document/size')(),
      require('../sources/browser/document/title')(),
      require('../sources/browser/document/url')(),
      require('../sources/browser/document/viewport')(),
      require('../sources/browser/features/cookie')(),
      require('../sources/browser/features/local-storage')(),
      require('../sources/browser/features/plugins')(),
      require('../sources/browser/features/session-storage')(),
      require('../sources/browser/features/touch')(),
      require('../sources/browser/fingerprint/canvas')(),
      require('../sources/browser/fingerprint/webgl')(),
      require('../sources/browser/fingerprint')(),
      require('../sources/browser/session/domain')({
        store: store
      }),
      require('../sources/browser/user/domain')({
        store: store
      }),
      require('../sources/browser/user/network')({
        store: store
      })
    );
}
