/* 
 * Shrtr API
 * opts = { 
 *  db: REDISCONNECTION,
 *  app: APPLICATION
 * }
 */

var urlModel = require("../models/url");

var shrtr = function(opts) {
  // routes
  var app = opts.app;
  var url = urlModel({ db: opts.db });

  // Handle interface loading
  app.get("/", function(req, res){
    res.render("shrtr", { surl: false });
  });

  app.get("/:surl", function(req, res){
    res.render("shrtr", { surl: req.params.surl });
  });

  // Extend and shorten urls
  app.post("/extn", function(req, response){
    url.get(req.body.surl, function(err, res){
      if(err) {
        resp = {"error": "Error"};
      } else {
        if(res === null){
          resp = {"error": "Not found"};
        } else {
          resp = {"url": res};
        }
      }
      response.send(resp);
    });
  });

  app.post("/shrtn", function(req, response){
    url.create(req.body.url, function(err, res){
      if(err) {
        resp = {"error": "Error"};      
      } else {
        resp = {"surl": res};
      }
      response.send(resp);
    });
  });  
};

module.exports = shrtr;
