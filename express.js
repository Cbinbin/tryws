const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
 
const app = express();
 
app.use(function (req, res) {
  res.send({ msg: "hello" });
});
 
const server = http.createServer(app);
const wss = new WebSocket.Server({ 
  clientTracking: true,
  server: server
});

wss.on('connection', (ws)=> {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
  ws.on('message', (data)=> {
    wss.clients.forEach((client)=> {
      client.send(data);
    });
  });
 
  ws.send('Welcome to room!');
});
 
server.listen(8090, function listening() {
  console.log('Listening on %d', server.address().port);
});