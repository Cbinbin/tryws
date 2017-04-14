const jsSHA = require('jssha')
  , youy = process.env.YOUYUAN

function checkYouYuan(router) {
  router.use('*', (req, res, next) => {
    var encryptedYY = req.query.youyuan 
      , shaObj = new jsSHA('SHA-1', 'TEXT')
    shaObj.update(youy)
    if(shaObj.getHash('HEX') === encryptedYY) next()
    else res.send({code: 411, errMsg: `You have't permission`, data: [] })
  })
}

module.exports = checkYouYuan