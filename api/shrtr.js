/* 
 * API
 */

var Url = require("../models/url");

var api = {

  get: function(req, res){
    res.send({"error": "method missing"});
  },

  shorten: function(req, res){
    res.send({"error": "method missing"});
  }
}

exports = module.exports = api;
