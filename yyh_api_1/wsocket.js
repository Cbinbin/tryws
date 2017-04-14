const WebSocket = require('ws')
  , url = require('url')
  , http = require('http')

function wsocket(app) {
  const server = http.createServer(app)
    , wss = new WebSocket.Server({ server })

  wss.on('connection', (ws)=> {
    const location = url.parse(ws.upgradeReq.url, true)
    
    ws.on('message', (data)=> {
      wss.clients.forEach((client)=> { 
        client.send(data)
        console.log('Client:' + data)
      })
    })
    ws.send('Welcome to room!')
  })

  return server
}

module.exports = wsocket