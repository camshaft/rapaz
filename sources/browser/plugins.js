var merge = require('../merge');
var plugins = require('./window').navigator.plugins;

module.exports = function() {
  return merge({
    plugins: (function() {
      if (!plugins) return undefined;
      var acc = [];
      for(var i = 0, p, mt; i < plugins.length; i++) {
        p = plugins[i];
        mt = [];
        for(var j = 0; j < p.length; j++) {
          mt.push({
            type: p[j].type,
            suffixes: p[j].suffixes
          });
        }
        acc.push({
          name: p.name,
          description: p.description,
          mediatypes: mt
        });
      }
      return acc;
    })()
  }, 'client');
};
