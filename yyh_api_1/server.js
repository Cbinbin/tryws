const express = require('express')
  , server = express()

require('./mongodb')
require('dotenv').config()

const cors = require('cors')
  , bodyParser = require('body-parser')
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
// server.use('/public', express.static('public'))

const port = process.env.PORT
  , routes = require('./routes')
  , wsocket = require('./wsocket')
  // , kicker = require('./routes/kickerRoutes')

server.use('/', routes.home)
// server.use('/kicker', kicker)
// server.use('/admin', routes.admin)
// server.use('/wechat', routes.wechat)
// server.use('/wechatpay', routes.wechatpay)
// server.use('/period', routes.period)
// server.use('/field', routes.field)
// server.use('/site', routes.site)

const socketServer = wsocket(server)

socketServer.listen(port, ()=> {
  console.log('Server is ruuning on port: ' + port)
  console.log('Use Ctrl-C to stop')
})