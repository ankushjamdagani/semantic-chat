function initExpressController(app) {
  // Import models
  const AuthController = require("./auth");
  const UserController = require("./user");
  const MessageController = require("./message");
  const SocketController = require("./socket");

  const { constructRestResponse } = require("../helpers");

  const requireLogin = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      req.logOut();
      req.session.destroy(err => {
        res.clearCookie("app_token");
        res.status(401).send(constructRestResponse(401, "Error", "Logged out"));
      });
    }
  };

  // Declare express routes
  app.get("/api", (req, res) =>
    res.status(200).send(constructRestResponse(200, "SUCCESS", "API works."))
  );
  app.use("/api/v1/auth", AuthController);
  app.use("/api/v1/user", requireLogin, UserController);
  app.use("/api/v1/message", requireLogin, MessageController);

  // Declare socket routes
  const io = app.get("socketIo");

  io.of("/socket/v1/chat").on("connection", SocketController);
}

module.exports = initExpressController;
