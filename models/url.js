/*
 * Url model
 * opts: { db: REDISCONNECTION }
 */

var url = function(opts){
  var that = {},
      counter,
      db = opts.db;

  db.setnx("counter", 0, function(err, res){
    if(err) throw "Initialization failed";
    if(res === 1) {
      counter = 0;
    } else {
      db.get("counter", function(err, res){
        if(err) throw "Initialization failed";
        counter = parseInt(res, 10);
      });
    }
  });

  that.get = function(surl, cb){
    db.get(surl, function(err, res){
      if(err){
        cb(err);
        return;
      }
      cb(null, res);
    });
  };

  that.create = function(url, cb){
    db.incr("counter", function(err, res){
      if(err) {
        cb(err);
        return;
      }
      key = res.toString(32);
      db.set(key, url, function(err, res){
        if(err) {
          cb(err);
          return;
        }
        cb(null, key);
      });
    });
  };

  return that;
};

module.exports = url;
