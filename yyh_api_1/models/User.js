const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Cert = require('./Cert')

const userSchema = new Schema({
  //微信信息
  openId: { 
    type: String, 
    required: true
  },
  weixiName: { type: String },
  headimg: { type: String },
  sex: { type: String },
  province: { type: String },
  city: { type: String },
  //完善信息
  phone: { type: Number },
  weixin: { type: String },        //微信号
  dateBirth: { type: String },        //出生日期  [计算年龄]
  unit: { type: String },        //单位
  education: { type: String },        //学历
  specialty: { type: String },        //特长
  hobby: { type: String },        //爱好
  height: { type: Number },        //身高
  weight: { type: Number },        //体重
  bloodType: { type: String },        //血型
  constellation: { type: String },        //星座
  currentLocation: { type: String },        //当前位置
  jobType: { type: String },        //工作类型
  motto: { type: String },        //格言
  photos: [{ type: String }],        //相册
  beLikes: { type: Number },        //被赞数
  adoptedIds: [{        //可看信息的人
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  // ulat: { type: Number },        //纬度
  // ulng: { type: Number },        //经度
  certification: { type: Boolean },
  certId: {
    type: Schema.Types.ObjectId,
    ref: 'Cert'
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  userUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'userCreated',
    updatedAt: 'userUpdated'
  }
})
module.exports = mongoose.model('User', userSchema)