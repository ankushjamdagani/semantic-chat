const { UserModel, MessageModel } = require("../models");

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const Console = {
  log: msg => {
    console.log("\x1b[47m\x1b[30m", "Socket\t :: ", "\x1b[0m", msg);
  },
  error: msg => {
    console.log("\x1b[41m\x1b[30m", "Socket\t :: ", "\x1b[0m", msg);
  },
  warn: msg => {
    console.log("\x1b[43m\x1b[30m", "Socket\t :: ", "\x1b[0m", msg);
  }
};

const USERS_MAP = {};
const SocketController = socket => {
  Console.log("Connected");
  const _user = new UserModel();
  // Miscleneous middleware
  // Can do any type of logging or error handling in here.
  socket.use((packet, next) => {
    return next();
  });

  socket.on("error", error => {
    throw error;
  });

  socket.on("i_have_joined", user_id => {
    _user.getUserFromId(user_id, user_raw => {
      const user_data = {
        _id: user_raw._id,
        isActive: user_raw.isActive,
        username: user_raw.username,
        email: user_raw.email,
        phone: user_raw.phone,
        created_at: user_raw.created_at,
        last_seen: user_raw.last_seen
      };
      // Save user reference in users_map
      USERS_MAP[user_id] = socket.id;

      // Update friends list of others
      for (let userId in USERS_MAP) {
        if (userId !== user_id) {
          socket.to(USERS_MAP[userId]).emit("friends_update", user_data);
        }
      }
    });
  });

  socket.on("disconnect", function(reason) {
    let user_id = null;
    for (let key in USERS_MAP) {
      if (USERS_MAP[key] === socket.id) {
        user_id = key;
        break;
      }
    }
    user_id &&
      _user.getUserFromId(user_id, user_raw => {
        const user_data = {
          _id: user_raw._id,
          isActive: user_raw.isActive,
          username: user_raw.username,
          email: user_raw.email,
          phone: user_raw.phone,
          created_at: user_raw.created_at,
          last_seen: user_raw.last_seen
        };

        delete USERS_MAP[user_id];
        for (let key in USERS_MAP) {
          socket.to(USERS_MAP[key]).emit("friends_update", user_data);
        }
        Console.log("Disconnected [logout] " + socket.id);
      });
    Console.log("Disconnected [strange] " + socket.id);
  });

  // TODO
  socket.on("message", function(message) {
    for (let userId in USERS_MAP) {
      if (userId !== message.sender) {
        socket.to(USERS_MAP[userId]).emit("message", message);
      }
    }
    Console.log(" msg ::" + message.content);
  });
};

module.exports = SocketController;
