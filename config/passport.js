const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/users');
const Participant = require('../models/participants');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {username:username};
    console.log(username);
    Participant.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, participant.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, participant);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(participant, done) {
    done(null, participant.id);
  });

  passport.deserializeUser(function(id, done) {
    Participant.findById(id, function(err, participant) {
      done(err, participant);
    });
  });
}