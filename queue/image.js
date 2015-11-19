module.exports = ImageQueue;

function ImageQueue(state, store) {
  this._q = state ? JSON.parse(state) : [];
  this._s = store ? store.set.bind(store) : function() {};
}

ImageQueue.prototype = {
  push: function(url) {
    var self = this;
    self._q.push(url);
    if (!self._flushing) self.flush();
    return self;
  },
  flush: function() {
    var self = this;
    var q = self._q;
    if (!q.length) {
      self._flushing = false;
      return;
    }
    self._flushing = true;

    var img = new Image(1, 1);

    img.onload = function() {
      q.shift();
      self._s('imgq', JSON.stringify(q));
      self.flush();
    };

    img.onerror = function() {
      self._flushing = false;
    };

    img.src = q[0];
  }
};
