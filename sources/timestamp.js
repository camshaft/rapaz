module.exports = function() {
  return function(method, data) {
    data.timestamp = new Date();
    return data;
  };
};
