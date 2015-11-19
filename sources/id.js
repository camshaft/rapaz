var uuid = require('uuid').v4;

module.exports = function() {
  return function(_, data) {
    data.id = uuid();
    return data;
  }
};
