const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , User = require('./User')
  , Apply = require('./Apply')

const cacheSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  applyId: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Apply'
  }],
  cacheCreated: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Cache', cacheSchema)