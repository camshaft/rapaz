var merge = require('../../merge');
module.exports = function() {
  return merge({
    sessionStorage: require('../../../lib/browser/features/session-storage')
  }, ['client', 'features'])
};
