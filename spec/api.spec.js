process.env.NODE_ENV = "test";
process.env.PORT = 9876;

var server = require("../app.js");
var URL = require("../models/url");
var request = require("request");

describe("API", function() {
  var baseUrl = "http://localhost:" + process.env.PORT;
  var _server;

  beforeEach(function() {
    var done = false;
    runs(function() {
      _server = server.listen(process.env.PORT, function(err) {
        done = true;
      });
    });
    waitsFor(function() {
      return done;
    });
  });

  afterEach(function() {
    _server.close();
    URL.closeConnection();
  });

  it("gets /", function(done) {
    request.get(baseUrl + "/", function(err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it("get /1", function(done) {
    request.get(baseUrl + "/1", function(err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it("post /shrtn", function(done) {
    request.post(
      { url: baseUrl + "/shrtn", json: { url: "http://example.com" } },
      function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
  });

  it("does not allow invalid urls in post /shrtn", function(done) {
    request.post(
      { url: baseUrl + "/shrtn", json: { url: "invalid" } },
      function(err, res, body) {
        expect(body.error).toBeNotNull();
        done();
      }
    );
  });

  it("post /extn", function(done) {
    request.post(
      { url: baseUrl + "/extn", json: { surl: "1" } },
      function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
  });

});
