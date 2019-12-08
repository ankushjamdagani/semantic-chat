var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  UserModel
} = require('../models');

const initPassport = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    UserModel.findOne({email: email})
      .then(function(user){
        if(!user){
          return done(null, false, 'email or password is invalid');
        }
        user.validPassword(password, function(isCorrect) {
          if(isCorrect) {
            return done(null, user)
          }
          return done(null, false, 'password is incorrect');
        });
      })
      .catch(done);
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, done);
  });
}

module.exports = initPassport;