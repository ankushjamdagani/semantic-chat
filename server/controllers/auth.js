const express = require("express");
const router = express.Router();
const passport = require("passport");

const { constructRestResponse } = require("../helpers");

const { UserModel } = require("../models");

router.get("/", function(req, res) {
  res
    .status(200)
    .send(constructRestResponse(200, "SUCCESS", "Auth API works."));
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .send(
          constructRestResponse(401, "ERROR", "Invalid username or password")
        );
    }

    req.login(user, {}, function(err) {
      if (err) {
        return next(err);
      }
      const user_data = {
        _id: user._id,
        isActive: user.isActive,
        username: user.username,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        last_seen: user.last_seen
      };
      return res
        .status(200)
        .send(constructRestResponse(200, "SUCCESS", user_data));
    });
  })(req, res, next);
  return;
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

router.post("/register", (req, res) => {
  const { username, password, email, phone } = req.body;

  const newUser = new UserModel({
    username,
    password,
    email,
    phone
  });

  newUser.doesEmailExist(function(emailExist) {
    if (emailExist) {
      res
        .status(400)
        .send(constructRestResponse(400, "ERROR", "Email already exist!"));
    } else {
      newUser.doesPhoneExist(function(phoneExist) {
        if (phoneExist) {
          res
            .status(400)
            .send(constructRestResponse(400, "ERROR", "Phone already exist!"));
        } else {
          newUser
            .save()
            .then(user => {
              res.status(200).send(constructRestResponse(200, "SUCCESS"));
            })
            .catch(err => {
              res.status(400).send(
                constructRestResponse(400, "ERROR", {
                  err,
                  message:
                    "User registering failed! Please try again after some time!"
                })
              );
            });
        }
      });
    }
  });
});

router.post("/forgot_password", (req, res) => {
  res.send(req.isAuthenticated());
});

module.exports = router;
