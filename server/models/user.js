const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        const patt = /^[a-z0-9_-]{3,15}$/gi;
        return value && patt.test(value);
      },
      message: props => `${props.value} is not a valid username`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        return value && value.length >= 6 && value.length <= 15;
      },
      message: props => `Password (${props.value}) should be >= 6 and <= 15`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => {
        var patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
        return value && patt.test(value);
      },
      message: props => `Email (${props.value}) pattern is incorrect`
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => {
        const patt = /^[0-9]{10}$/;
        return value && patt.test(value);
      },
      message: props => `Phone must be of 10 numerical characters`
    }
  },
  description: {
    type: String,
    validate: {
      validator: value => {
        return value && value.length < 255;
      },
      message: props => `Description must be less than 255 characters.`
    }
  },
  profile_pic: String,
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_seen: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  meta: Schema.Types.Mixed
});

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.doesEmailExist = function(cb) {
  return this.model("User")
    .find({
      email: this.email
    })
    .exec()
    .then(function(res) {
      cb && cb(res.length !== 0);
      return res;
    })
    .catch(function(err) {
      throw err;
    });
};

UserSchema.methods.doesPhoneExist = function(cb) {
  return this.model("User")
    .find({
      phone: this.phone
    })
    .exec()
    .then(function(res) {
      cb && cb(res.length !== 0);
      return res;
    })
    .catch(function(err) {
      throw err;
    });
};

UserSchema.methods.doesPhoneOrEmailExist = function(cb) {
  return this.model("User")
    .find()
    .or([{ email: this.email }, { phone: this.phone }])
    .then(function(res) {
      cb && cb(res.length === 0);
      return res;
    })
    .catch(function(err) {
      cb && cb(false, err);
      throw err;
    });
};

UserSchema.methods.validPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) throw err;

    cb(isMatch);
  });
};

UserSchema.methods.getUsers = function(filter = {}) {
  return this.model("User").find(filter);
};

UserSchema.methods.getUserFromId = function(id, cb) {
  return this.model("User")
    .findOne({
      _id: id
    })
    .then(function(user) {
      if (!user) {
        cb && cb(false, "id is invalid");
      }
      cb && cb(user);
      return user;
    })
    .catch(err => {
      cb && cb(false, err);
      throw err;
    });
};

UserSchema.methods.getUserFromEmail = function(email, cb) {
  return this.model("User")
    .findOne({
      email: email
    })
    .then(function(user) {
      if (!user) {
        return cb(false, "email is invalid");
      }
      return cb(user);
    })
    .catch(err => {
      throw err;
    });
};

UserSchema.methods.updateUser = async function(id, data) {
  return UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

UserSchema.methods.removeUser = async function(id) {
  return UserModel.findOneAndDelete({ _id: id });
};

UserSchema.methods.addUser = function(errorCallback, successCallback) {
  const newUser = new UserModel({
    username,
    password,
    email,
    phone
  });

  newUser.doesEmailExist(function(emailExist) {
    if (emailExist) {
      errorCallback("Email already exist!");
    } else {
      newUser.doesPhoneExist(function(phoneExist) {
        if (phoneExist) {
          errorCallback("Phone already exist!");
        } else {
          newUser
            .save()
            .then(user => {
              successCallback(user);
            })
            .catch(err => {
              errorCallback("User registration failed!");
              throw err;
            });
        }
      });
    }
  });
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
