const express = require('express');
const https = require('https');
const url = require('url');
const WebSocket = require('ws');
var fs = require('fs');
 
const app = express();
 
app.use(function (req, res) {
  res.send({ msg: "hello" });
});
 
const server = https.createServer(
    {
      'key':fs.readFileSync('cbinbin.key'),
      'cert':fs.readFileSync('cbinbin.crt')
    }
  );
const wss = new WebSocket.Server({ server });
 
wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see https://stackoverflow.com/a/16395220/151312) 
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});

server.on('request', app);
server.listen(8090, function listening() {
  console.log('Listening on %d', server.address().port);
});