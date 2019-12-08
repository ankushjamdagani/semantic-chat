const bcrypt = require("bcryptjs");

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, callback));
};

const constructRestResponse = (code, status, data) => {
  if (status === "SUCCESS") {
    return {
      code,
      status,
      data
    };
  } else {
    return {
      code,
      status,
      error: data
    };
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

const parseUserDataToSend = (user_raw) => {
  return {
    _id: user_raw._id,
    username: user_raw.username,
    email: user_raw.email,
    phone: user_raw.phone,
    is_active: user_raw.is_active,
    created_at: user_raw.created_at,
    last_seen: user_raw.last_seen
  }
}

module.exports = {
  hashPassword,
  constructRestResponse,
  isAuthenticated,
  parseUserDataToSend
};
