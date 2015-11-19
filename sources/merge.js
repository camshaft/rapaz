module.exports = function(obj, path) {
  if (!path) path = [];
  if (!Array.isArray(path)) path = [path];

  for (var k in obj) {
    if (typeof obj[k] === 'undefined') delete obj[k];
  }

  return function(method, data) {
    var ref = data;
    for (var i = 0, k; i < path.length; i++) {
      k = path[i];
      ref = ref[k] = ref[k] || {};
    }
    for (var k in obj) {
      ref[k] = obj[k];
    }
    return data;
  }
};
