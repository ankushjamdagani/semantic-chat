const { UserModel, MessageModel } = require("../models");
const { parseUserDataToSend } = require("../helpers");

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const Console = {
  log: msg => {
    console.log("\x1b[47m\x1b[30m", "Socket\t", "\x1b[0m", msg);
  },
  error: msg => {
    console.log("\x1b[41m\x1b[30m", "Socket\t", "\x1b[0m", msg);
  },
  warn: msg => {
    console.log("\x1b[43m\x1b[30m", "Socket\t", "\x1b[0m", msg);
  }
};

const USERS_MAP = {};
const SocketController = socket => {
  Console.log(`Connected [general] ${socket.id}`);
  const _user = new UserModel();

  /*
   * Miscleneous middleware
   * =====
   * Can do any type of logging or error handling in here.
   */
  socket.use((packet, next) => {
    return next();
  });

  socket.on("error", error => {
    throw error;
  });

  socket.on("i_have_joined", async user_id => {
    const user_raw = await _user.updateUser(user_id, {
      last_seen: Date.now(),
      is_active: true
    });

    // Save user reference in users_map
    USERS_MAP[user_id] = socket.id;

    // Update friends list
    const user_data = parseUserDataToSend(user_raw);
    socket.broadcast.emit("friends_update", user_data);

    Console.log(`Connected [log in] ${socket.id}`);
  });

  socket.on("disconnect", async reason => {
    let user_id = null;

    // find user_id from socket.id
    for (let key in USERS_MAP) {
      if (USERS_MAP[key] === socket.id) {
        user_id = key;
        break;
      }
    }

    if (user_id) {
      const user_raw = await _user.updateUser(user_id, {
        last_seen: Date.now(),
        is_active: false
      });

      // Delete user reference in users_map
      delete USERS_MAP[user_id];

      // Update friends list
      const user_data = parseUserDataToSend(user_raw);
      socket.broadcast.emit("friends_update", user_data);
      Console.log(`Disconnected [logout] ${socket.id}`);
    } else {
      Console.log(`Disconnected [general] ${socket.id}`);
    }
  });

  // TODO
  socket.on("message", function(message) {
    for (let userId in USERS_MAP) {
      if (userId !== message.sender) {
        socket.to(USERS_MAP[userId]).emit("message", message);
      }
    }
    Console.log(` msg :: ${message.content}`);
  });
};

module.exports = SocketController;
