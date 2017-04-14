const router = require('express').Router()
  , host = require('../utils/host')

router.get('/', (req, res)=> {
  res.json({
    api: host.youyuan
  })
})

module.exports = router