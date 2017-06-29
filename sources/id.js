var uuid = require('uuid/v4');

module.exports = function() {
  return function(method, data) {
    if (method === 'track') data.id = uuid();
    return data;
  }
};
