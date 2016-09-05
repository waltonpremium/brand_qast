var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT");
    console.log("JWT Payload: " + jwt_payload);
    console.log("JWT Payload: " + jwt_payload._id);
    User.findOne({_id: jwt_payload._id})
    .populate('_account')
    .exec(function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (!user) { return done(null,false); }
        user.comparePassword("password", function(err,isMatch){
            if (err) { return done(err, false); }
            if(!isMatch) { return done(null,false); }
            done(null, user);
        });
      });
  }));
};
