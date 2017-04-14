const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , User = require('./User')

const applySchema = new Schema({
  selfId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  affix: { type: String },        //留言
  applyCreated: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Apply', applySchema)