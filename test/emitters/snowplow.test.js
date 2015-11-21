var Tracker = require('../tracker');
var Snowplow = require('../../emitters/snowplow');
var parse = require('querystring').parse;

describe('snowplow', function() {
  it('should work', function(done) {
    var queue = {
      push: function(url) {
        var obj = parse(url.replace('?', ''));
        obj.e.should.eql('ue');
        obj.dtm.should.be.a.number;
        obj.tz.should.be.a.string;
        obj.eid.should.be.a.string;
        obj.duid.should.be.a.string;
        obj.nuid.should.be.a.string;
        obj.vid.should.be.a.string;
        obj.sid.should.be.a.string;
        obj.res.should.be.a.string;
        obj.url.should.be.a.string;
        obj.ua.should.be.a.string;
        obj.page.should.be.a.string;
        obj.refr.should.be.a.string;
        obj.fp.should.be.a.string;
        obj.cookie.should.be.a.string;
        obj.lang.should.be.a.string;
        obj.f_pdf.should.be.a.string;
        obj.f_qt.should.be.a.string;
        obj.f_realp.should.be.a.string;
        obj.f_wma.should.be.a.string;
        obj.f_dir.should.be.a.string;
        obj.f_fla.should.be.a.string;
        obj.f_java.should.be.a.string;
        obj.f_gears.should.be.a.string;
        obj.f_ag.should.be.a.string;
        obj.cd.should.be.a.string;
        obj.ds.should.be.a.string;
        obj.cs.should.be.a.string;
        obj.vp.should.be.a.string;
        obj.ue_px.should.be.a.string;

        // make sure we can decode it
        JSON.parse(new Buffer(obj.ue_px, 'base64').toString());

        done();
      }
    };

    var i = Tracker()
      .on(Snowplow({
        queue: queue,
        url: ''
      }));

    i('track', {
      schema: 'iglu:com.foo.bar/test/jsonschema/1-0-0',
      data: {
        foo: 'bar'
      }
    });
  })
});
