module.exports = function(fn) {
  var name = 'test';
  try {
    var obj = fn();
    // Create cookie
    obj.setItem(name, '1');
    var isEnabled = !!obj.getItem(name);
    obj.removeItem(name);
    return isEnabled;
  } catch(e) {
    return false;
  }
};
