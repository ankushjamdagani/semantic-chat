const LocalStrategy = require('passport-local').Strategy;
const {
  UserModel
} = require('../models');

const initPassport = function(passport) {
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
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initPassport;