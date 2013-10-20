/**
* Module dependencies.
*/

var express = require("express"),
http = require("http"),
shrtr = require("./api/shrtr");

var app = express(),
server = http.createServer(app);

module.exports = server;

// Configuration
var port = process.env.PORT || 3000;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', 'test', function(){
  var s = shrtr({ app: app});
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true }
  ));
});

app.configure('production', function(){
  var s = shrtr({ app: app });
  app.use(express.errorHandler());
});

// Startup
if(process.env.NODE_ENV !== "test") {
  server.listen(port, function(){
    console.log("Shrtr server listening on port %d in %s mode",
      port,
      app.settings.env
    );
  });
}
