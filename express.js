'use strict'

var fs = require('fs');
var https = require('https');

var server = https.createServer(
    {
      'key':fs.readFileSync('cbinbin.key'),
      'cert':fs.readFileSync('cbinbin.crt')
    }
  );
var  url = require('url');
var  WebSocketServer = require('ws').Server;
var  wss = new WebSocketServer({
        server: server
      });
var express = require('express');
var app = express();
var port = 8090;

app.use(function(req, res) {
    res.send({
        msg: "hello"
    });
});

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.on('request', app);
server.listen(port, function() {
    console.log('Listening on ' + server.address().port)
});