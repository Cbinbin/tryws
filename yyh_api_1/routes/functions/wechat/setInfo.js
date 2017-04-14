const jwt = require('jsonwebtoken')
  , User = require('../../../models/User')
  , youyuanSalt = process.env.YY_SALTKEY

function setInfo(wxInfo, res) {
  User.findOne({openId: wxInfo.openId})
  .exec((err, same)=> {
    if(err) return res.send({code: 500, errMsg: err, data: [] })
    if(same) {
      jwt.sign({userId: same._id, opId: same.openId}, 
      youyuanSalt, 
      {expiresIn: '10d'}, 
      (err, token)=> {
        if(err) return res.send({code: 500, errMsg: err, data: [] })
        res.send({code: 201, errMsg: 'ok', data: {token: token} })
      })
    } else {
      const info = new User({
        openId: wxInfo.openId,
        weixiName: wxInfo.nickName,
        headimg: wxInfo.avatarUrl,
        sex: wxInfo.sex,
        province: wxInfo.province,
        city: wxInfo.city,
        phone: null,
        weixin: null,
        dateBirth: null,
        unit: null,
        education: null,
        specialty: null,
        hobby: null,
        height: 0,
        weight: 0,
        bloodType: null,
        constellation: null,
        currentLocation: null,
        jobType: null,
        motto: null,
        photos: [],
        beLikes: 0,
        adoptedIds: [],
        certification: false,
        certId: null
      })
      info.save((err)=> {
        if(err) return res.send({code: 500, errMsg: err, data: [] })
        jwt.sign({userId: info._id, opId: info.openId}, 
        youyuanSalt, 
        {expiresIn: '10d'}, 
        (err, token)=> {
          if(err) return res.send({code: 500, errMsg: err, data: [] })
          res.send({code: 201, errMsg: 'ok', data: {token: token} })
        })
      })
    }
  })
}
module.exports = setInfo