var Memory = require('rapaz/store/memory');

module.exports = function(stores, enabled) {
  enabled = enabled || ['cookie', 'localStorage', 'sessionStorage'];
  for (var i = 0, s; i < enabled.length; i++) {
    s = enabled[i];
    if (!s) continue;
    s = stores[s] || s;
    if (s.isEnabled) return s;
  };
  return new Memory();
};
