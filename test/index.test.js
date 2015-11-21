var Tracker = require('./tracker');

describe('rapaz', function() {
  it('should work', function(done) {
    var i = Tracker();
    i.on(function(_, data) {
      data.id.should.exist;
      data.timestamp.should.exist;
      data.client.should.exist;
      data.doNotTrack.should.exist;

      var client = data.client;
      client.colorDepth.should.exist;
      client.languages.length.should.be.greaterThan(0);
      client.plugins.should.exist;
      client.resolution.length.should.eql(2);
      client.timezone.should.exist;
      client.useragent.should.exist;

      client.canvas_fingerprint.should.exist;
      client.webgl_fingerprint.should.exist;

      var doc = data.document;
      doc.charset.should.exist;
      doc.referrer.should.exist;
      doc.size.length.should.eql(2);
      doc.title.should.exist;
      doc.url.should.exist;
      doc.viewport.length.should.eql(2);

      var features = client.features;

      features.cookie.should.exist;
      features.localStorage.should.exist;
      features.sessionStorage.should.exist;
      features.pdf.should.exist;
      features.quicktime.should.exist;
      features.realplayer.should.exist;
      features.wma.should.exist;
      features.director.should.exist;
      features.flash.should.exist;
      features.java.should.exist;
      features.gears.should.exist;
      features.silverlight.should.exist;
      features.touch.should.exist;

      client.fingerprint.should.exist;

      var user = data.user;
      user.domain_id.should.exist;
      user.network_id.should.exist;

      var session = data.session;
      session.id.should.exist;
      session.idx.should.exist;

      done();
    });
    i('track', {foo: 'bar'});
  });
});
