var merge = require('../../merge');
var window = require('../window');
var navigator = window.navigator;

module.exports = function() {
  var mimeType;
  var features = {};
  var mimeTypes = navigator.mimeTypes;

  if (mimeTypes && mimeTypes.length) {
    for (var i in pluginMap) {
      mimeType = mimeTypes[pluginMap[i]];
      features[i] = !!(mimeType && mimeType.enabledPlugin);
    }
  }

  // Safari and Opera
  // IE6/IE7 navigator.javaEnabled can't be aliased, so test directly
  if (typeof navigator.javaEnabled === 'function' && navigator.javaEnabled()) {
    features.java = true;
  }

  // Firefox
  if (typeof window.GearsFactory == 'function') features.gears = true;

  return merge(features, ['client', 'features']);
};

var pluginMap = {
  // document types
  pdf: 'application/pdf',

  // media players
  quicktime: 'video/quicktime',
  realplayer: 'audio/x-pn-realaudio-plugin',
  wma: 'application/x-mplayer2',

  // interactive multimedia
  director: 'application/x-director',
  flash: 'application/x-shockwave-flash',

  // RIA
  java: 'application/x-java-vm',
  gears: 'application/x-googlegears',
  silverlight: 'application/x-silverlight'
};
