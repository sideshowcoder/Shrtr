/**
 * Module dependencies.
 */

var express = require("express"), 
    shrtr = require("./api/shrtr");

var app = module.exports = express.createServer();

// Configuration
var port = process.env.PORT || 3000,
    Shrtr, redis;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  // we dont use minified js during dev
  app.minifiedjs = false;
  // during local development we assume redis defaults on localhost
  redis = require("redis").createClient();
  Shrtr = new shrtr.Shrtr({ db: redis, app: app});
  app.use(express.errorHandler({ 
    dumpExceptions: true, 
    showStack: true }
  )); 
});

app.configure('production', function(){
  // use the minified js in views
  app.minifiedjs = false;
  // heroku deploy uses REDISTOGO
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
  Shrtr = new shrtr.Shrtr({ db: redis, app: app });
  app.use(express.errorHandler()); 
});

// Startup 
app.listen(port, function(){
  console.log("Shrtr server listening on port %d in %s mode", 
    app.address().port, 
    app.settings.env
  );
});
