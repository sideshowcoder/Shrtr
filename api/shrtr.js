/* 
 * Shrtr API
 * opts = { 
 *  db: REDISCONNECTION,
 *  app: APPLICATION
 * }
 */

var url = require("../models/url");

var Shrtr = function(opts) {
  // routes
  var app = opts.app;
  var Url = new url.Url({ db: opts.db });

  // Handle interface loading
  app.get("/", function(req, res){
    res.render("shrtr", { surl: false });
  });

  app.get("/:surl", function(req, res){
    res.render("shrtr", { surl: req.params.surl });
  });

  // Extend and shorten urls
  app.post("/extn", function(req, response){
    Url.get(req.body.surl, function(err, res){
      if(err) {
        resp = {"error": "Error"};
      } else {
        if(res == null){
          resp = {"error": "Not found"};
        } else {
          resp = {"url": res};
        }
      }
      response.send(resp);
    });
  });

  app.post("/shrtn", function(req, response){
    Url.create(req.body.url, function(err, res){
      if(err) {
        resp = {"error": "Error"};      
      } else {
        resp = {"surl": res};
      }
      response.send(resp);
    });
  });  
};

exports.Shrtr = Shrtr;
