var storage = require('./storage');

module.exports = function() {
  return storage('indexedDB');
};
