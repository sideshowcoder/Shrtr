/**
 * Module dependencies.
 */

var express = require("express"), api = require("./api")

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// API
app.get("/", api.index);
app.post("/shrtn", api.shorten);

app.listen(3000);
console.log("Shrtr server listening on port %d in %s mode", app.address().port, app.settings.env);
