const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TYPE = Object.freeze({
  DIRECT: 0,
  MULTICAST: 1,
  BROADCAST: 2,
  STORY: 3
});

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: Object.values(TYPE)
  },
  meta: Schema.Types.Mixed
});

module.exports = mongoose.model("Message", MessageSchema);
