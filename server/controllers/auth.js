const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  constructResponse
} = require('../helpers');

const { 
  UserModel 
} = require('../models');

router.get('/', function (req, res) {
  res.status(200).send({
    code: 200,
    message: 'Auth API works.'
  });
});

router.post('/login', 
  passport.authenticate('local'), 
  (req, res) => {
    res.send({
      message: 'logged in'
    })
  }
);

router.post('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

router.post('/register', (req, res) => {
  const {
    username,
    password,
    email,
    phone
  } = req.body;

  const newUser = new UserModel({
    username,
    password,
    email,
    phone
  })

  newUser.doesEmailExist(function(emailExist) {
    if(emailExist) {
      res
        .status(400)
        .send(constructResponse(400, 'Email already exist!'));
    }
    else {
      newUser.doesPhoneExist(function(phoneExist) {
        if(phoneExist) {
          res
            .status(400)
            .send(constructResponse(400, 'Phone already exist!'));
        }
        else {
          newUser
            .save()
            .then(user => {
              res
                .status(200)
                .send(constructResponse(200, 'User registered successfully!', {id: user._id}));
            })
            .catch(err => {
              res
                .status(400)
                .send(constructResponse(400, 'User registration failed!', {err,data: req.body}));
            });
        }
      })
    }
  });

});

router.post('/forgot_password', (req, res) => {
  res.send(req.isAuthenticated());
});

module.exports = router;