const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , User = require('./User')

const certSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  realName: { type: String },        //真实姓名
  ID_No: { type: Number },        //身份证号
  ID_Pic: { type: String },        //身份证图片
  certCreated: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Cert', certSchema)