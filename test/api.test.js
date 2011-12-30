var assert = require('assert'), util = require('util'),
    server = require("../app.js");

// Tests
module.exports = {
  "/": function(){
    assert.response(server, 
    { url: '/', timeout: 500 }, 
    { status: 200 });
  },
  
  "/1": function(){
    assert.response(server, 
    { url: '/1', timeout: 500 }, 
    { status: 200 });
  },
  
  "/shrtn": function(){
    assert.response(server, 
    { 
      url: '/shrtn', 
      timeout: 500,
      method: "POST",
      data: "{ url: 'http://www.google.com' }" 
    }, 
    { 
      status: 200,
    });
  },
  
  "/extn": function(){
    assert.response(server, 
    { 
      url: '/extn', 
      timeout: 500,
      method: "POST",
      data: "{surl: '1'}" 
    }, 
    { 
      status: 200,
    });
  }
};
  
  