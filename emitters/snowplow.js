var encode = require('../lib/base64').encode;

module.exports = function(opts) {
  var url = opts.url;
  var queue = opts.queue;

  return function(method, data, contexts) {
    var obj = toJSON(method, data, contexts);
    if (obj.e) queue.push(url + '?' + toString(obj));
    else console.error('Undefined method for snowplow tracker: ' + JSON.stringify(method));
  };
}

function toJSON(method, data, contexts) {
  var user = data.user || {};
  var session = data.session || {};
  var client = data.client || {};
  var features = client.features || {};
  var document = data.document || {};

  return {
    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#11-application-parameters
    aid: data.appId,
    p: data.platform,

    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#12-date--time-parameter
    dtm: +data.timestamp,
    tz: data.client.timezone,

    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#13-event--transaction-parameters
    e: eventType(method),
    eid: data.id,

    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#15-user-related-parameters
    duid: user.domain_id,
    nuid: user.network_id,
    uid: user.id,
    vid: session.idx,
    sid: session.id,

    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#16-device-related-properties
    res: dimensions(client.resolution),

    // https://github.com/snowplow/snowplow/wiki/snowplow-tracker-protocol#21-web-specific-parameters
    url: document.url,
    ua: client.useragent,
    page: document.title,
    refr: document.referrer,
    fp: client.fingerprint,
    cookie: bool(features.cookie),
    lang: (client.languages || [])[0],
    f_pdf: bool(features.pdf),
    f_qt: bool(features.quicktime),
    f_realp: bool(features.realplayer),
    f_wma: bool(features.wma),
    f_dir: bool(features.director),
    f_fla: bool(features.flash),
    f_java: bool(features.java),
    f_gears: bool(features.gears),
    f_ag: bool(features.silverlight),
    f_ab: bool(client.adblock),
    cd: client.colorDepth,
    ds: dimensions(document.size),
    cs: document.charset,
    vp: dimensions(document.viewport),

    ue_px: jsonbase64(data.data),
    cx: jsonbase64(contexts)
  };
}

function eventType(method) {
  return ({
    track: 'ue',
    trackUnstructEvent: 'ue',
    trackPageView: 'pv'
  })[method];
}

function dimensions(dims) {
  return Array.isArray(dims) ? dims.join('x') : undefined;
}

function bool(value) {
  return value ? '1' : '0';
}

function jsonbase64(value) {
  if (!value) return undefined;
  return encode(JSON.stringify(value));
}

function toString(obj){
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];
    if (typeof value !== 'undefined') pairs.push(key + '=' + encodeURIComponent('' + value));
  }

  return pairs.join('&');
};
