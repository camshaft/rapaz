var imurmurhash = require('imurmurhash');

module.exports = function() {
  return function(_, data) {
    var client = data.client;
    client.fingerprint = hash(client);
    return data;
  };
}

function hash(obj) {
  var state = imurmurhash('');

  (function stringify (node) {
    var type = typeof node;

    if (type == 'undefined') return;

    if (node !== 'object' || node === null) {
      state.hash(type);
      state.hash('' + node);
      return;
    }

    if (Array.isArray(node)) {
      state.hash('ARRAY');
      for (var i = 0; i < node.length; i++) {
        stringify(node[i]);
      }
    } else {
      state.hash('OBJECT');
      var keys = Object.keys(node).sort();
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        state.hash(''+key);
        stringify(node[key]);
      }
    }
  })(obj);

  return state.result();
};
