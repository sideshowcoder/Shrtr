/**
 * Module dependencies.
 */

var express = require("express"), 
    api = require("./api");

var app = module.exports = express.createServer();

// Configuration
var port = process.env.PORT || 3000;

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ 
    dumpExceptions: true, 
    showStack: true }
  )); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Request API
app.get("/*", api.get);
app.post("/shrtn", api.shorten);

// Startup 
app.listen(port, function(){
  console.log("Shrtr server listening on port %d in %s mode", 
    app.address().port, 
    app.settings.env
  );
});
