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

MessageSchema.methods.createMessage = function(data) {
  if (!data || !data.sender || !data.reciever || !data.content) {
    throw "Invalid message";
  }
  const message = new MessageModel(data);
  return message.save();
};

MessageSchema.methods.getMessages = function(filter = {}) {
  return this.model("Message").find(filter);
};

MessageSchema.methods.getMessageFromId = function(id, cb) {
  return this.model("Message")
    .findOne({
      _id: id
    })
    .then(function(message) {
      if (!message) {
        cb && cb(false, "id is invalid");
      }
      cb && cb(message);
      return message;
    })
    .catch(err => {
      cb && cb(false, err);
      throw err;
    });
};

MessageSchema.methods.updateMessage = async function(id, data) {
  return MessageModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

MessageSchema.methods.removeMessage = async function(id) {
  return MessageModel.findOneAndDelete({ _id: id });
};

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
