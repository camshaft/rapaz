module.exports = function(obj) {
  var name = 'test';
  try {
    // Create cookie
    obj.setItem(name, '1');
    var isEnabled = !!obj.getItem(name);
    obj.removeItem(name);
    return isEnabled;
  } catch(e) {
    return false;
  }
};
