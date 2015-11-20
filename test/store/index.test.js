var Store = require('../../store');

var stores = {
  cookie: require('../../store/cookie'),
  localStorage: require('../../store/local-storage'),
  memory: require('../../store/memory'),
  sessionStorage: require('../../store/session-storage')
};

var instances = module.exports = {};
for (var k in stores) {
  instances[k] = new stores[k]();
}

describe('store', function() {
  Object.keys(stores).forEach(function(k) {
    describe(k, function() {
      it('should work', function(done) {
        helper(new stores[k], done);
      });

      it('should select the store', function() {
        Store(instances, [k]).name.should.eql(k);
      });
    });
  })
});

function helper(store, done) {
  store.isEnabled.should.be.true;
  should.be.ok(store.get('foo') == undefined);
  store.set('foo', 'bar');
  store.get('foo').should.eql('bar');
  store.set('foo', 'baz', 0);
  store.get('foo').should.eql('baz');
  setTimeout(function() {
    should.be.ok(store.get('foo') == undefined);
    done();
  }, 10);
};
