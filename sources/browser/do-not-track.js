var merge = require('../merge');
var window = require('./window');

module.exports = function() {
  var doNotTrack = window.doNotTrack || window.navigator.doNotTrack;
  return function(_, data) {
    var client = data.client = data.client || {};
    // We set the original value on the client so fingerprinting works a bit better
    client.doNotTrack = doNotTrack;
    // We normalize the do-not-track property so we can opt out
    data.doNotTrack = normalize(doNotTrack);
    return data;
  };
};

function normalize(v) {
  return ({
    unspecifed: 'unspecifed',
    '1': true,
    '0': false,
    'yes': true,
    'no': false
  })[v] || 'unspecifed';
}
