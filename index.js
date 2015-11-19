var merge = require('./sources/merge');

module.exports = Rapaz;

/**
 * Initialize a Rapaz instance
 */

function Rapaz() {
  var self = function() { return self.e.apply(self, arguments); };
  self._s = [];
  self._e = [];
  for (var k in prototype) {
    self[k] = prototype[k];
  }
  return self;
}

var prototype = {
  /**
   * Register a plugin
   */

  use: function() {
    var self = this;
    self._s.push.apply(self._s, arguments);
    return self;
  },

  /**
   * Register an emitter
   */

  on: function() {
    var self = this;
    self._e.push.apply(self._e, arguments);
    return self;
  },

  set: function(obj) {
    this.use(merge(obj));
  },

  /**
   * Send an event
   */

  e: function(method, data) {
    var self = this;

    /**
     * Transform the arguments with the sources
     */

    self.t(method, {data: data}, function(err, data) {
      if (err) console.error(err.stack || err);

      if (data) self._e.forEach(function(emitter) {
        emitter(method, data);
      });
    });

    return self;
  },

  /**
   * Transform an event through the registered sources
   */

  t: function(method, data, fn) {
    var self = this;
    transform(method, self._s, 0, fn, null, data);
    return self;
  }
};

/**
 * Transform a payload
 */

function transform(method, sources, i, done, err, data) {
  if (err || !data || sources.length === i) return done(err, data);

  var fn = transform.bind(null, method, sources, i + 1, done);

  var source = sources[i];
  return source.length === 2 ?
    fn(null, source(method, data)) :
    source(method, data, fn);
}
