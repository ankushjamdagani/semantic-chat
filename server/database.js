var mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/semantic-chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB"))
  .catch(() => console.error("DB connection error:"));

module.exports = mongoose;
