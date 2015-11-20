var merge = require('../../merge');
module.exports = function() {
  return merge({
    localStorage: require('../../../lib/browser/features/local-storage')
  }, ['client', 'features'])
};
