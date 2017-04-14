const router = require('express').Router()
  , request = require('superagent')
  , Apis = require('../utils/Apis')
  , WXBizDataCrypt = require('../utils/WXBizDataCrypt')
  // , checkYouYuan = require('../utils/checkYouYuan')
  , setInfo = require('./functions/wechat/setInfo')
  , youyuanId = process.env.YY_ID
  , youyuanSecret = process.env.YY_SECRET

// checkYouYuan(router)

router.get('/login', (req, res)=> {
  const code = req.query.code
  , iv = req.query.iv 
  , encryptedData = req.query.encryptedData
  if (!code || !iv || !encryptedData)
    return res.send({message: 'Missing Query String!'})
  request.get(`${Apis.session}?appid=${youyuanId}&secret=${youyuanSecret}&js_code=${code}&grant_type=authorization_code`)
  .end((err, result)=> {
    if(!JSON.parse(result.text).errcode) {
      const sessionKey = JSON.parse(result.text).session_key
      const pc = new WXBizDataCrypt(youyuanId, sessionKey)
      const wxInfo = pc.decryptData(encryptedData, iv)
      delete wxInfo.watermark
      // console.log(wxInfo)
      setInfo(wxInfo, res)
    } else res.send({code: 500, errMsg: result.text, data: [] })
  })
})

// router.get('/YYhash', (req, res)=> {
//   var YYHash = makeHash(YY)
//   res.send({code: 200, errMsg: 'hash', data: YYHash})
// })

module.exports = router