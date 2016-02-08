module.exports = function() {
  return function(method, data) {
    if (method === 'track') data.timestamp = new Date();
    return data;
  };
};
