function initExpressController(app) {
  // Import models
  const AuthController = require("./auth");
  const UserController = require("./user");
  const MessageController = require("./message");
  const SocketController = require("./socket");

  const { constructRestResponse } = require("../helpers");

  // Declare express routes
  app.get("/api", (req, res) =>
    res.status(200).send(constructRestResponse(200, "SUCCESS", "API works."))
  );
  app.use("/api/v1/auth", AuthController);
  app.use("/api/v1/user", UserController);
  app.use("/api/v1/message", MessageController);

  // Declare socket routes
  const io = app.get("socketIo");

  io.of("/socket/v1/chat").on("connection", SocketController);
}

module.exports = initExpressController;