var Queue = require('../queue/image')

var store = {
  get: function(name) {
    console.log('GET', name)
  },
  set: function(name, value, ttl) {
    console.log('SET', name, value);
  }
};

var queue = new Queue();

module.exports = require('..')()
  .use(
    require('../sources/id')(),
    require('../sources/timestamp')(),
    require('../sources/browser/color-depth')(),
    require('../sources/browser/cpu-class')(),
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
    require('../sources/browser/features/indexed-db')(),
    require('../sources/browser/features/local-storage')(),
    require('../sources/browser/features/plugins')(),
    require('../sources/browser/features/session-storage')(),
    require('../sources/browser/features/touch')(),
    // require('../sources/browser/fingerprint/canvas')(),
    // require('../sources/browser/fingerprint/webgl')(),
    require('../sources/browser/fingerprint')(),
    require('../sources/browser/user/domain')({
      store: store
    }),
    require('../sources/browser/session/domain')({
      store: store
    })
  )
  .on(require('../emitters/snowplow')({
    url: '//i.boombox.com/i',
    queue: queue
  }));
