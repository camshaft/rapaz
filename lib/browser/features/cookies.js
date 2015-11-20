module.exports = !!(function () {
  var name = 'test=';
  try {
    // Create cookie
    document.cookie = name + '1';
    var ret = document.cookie.indexOf(name) != -1;
    // Delete cookie
    document.cookie = name + '1; expires=' + (new Date(0));
    return ret;
  } catch (e) {}
})();
