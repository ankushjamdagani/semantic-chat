const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  type: {
    type: String,
    enum: ['SINGLE', 'MULTICAST', 'BROADCAST', 'STORY'],
  },
	meta: Schema.Types.Mixed
})

module.exports = mongoose.model('Message', MessageSchema);