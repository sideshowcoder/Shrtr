/* 
 * Url model
 * opts: { db: REDISCONNECTION }
 */

var Url = function(opts){
  var that = this;
  this.db = opts.db;
  that.db.setnx("counter", 0, function(err, res){
    if(err) throw "Initialization failed";
    if(res === 1) {
      that.counter = 0;
    } else {
      that.db.get("counter", function(err, res){
        if(err) throw "Initialization failed";
        that.counter = parseInt(res, 10);
      });
    }
  });
};

Url.prototype.get = function(surl, cb){
  this.db.get(surl, function(err, res){
    if(err){
      cb(err);
      return;
    }
    cb(null, res);
  });
};

Url.prototype.create = function(url, cb){
  var that = this;
  that.db.incr("counter", function(err, res){
    if(err) {
      cb(err);
      return;
    }
    key = res.toString(32);
    that.db.set(key, url, function(err, res){
      if(err) {
        cb(err);
        return;
      }
      cb(null, key);
    });
  });
};

exports.Url = Url;


