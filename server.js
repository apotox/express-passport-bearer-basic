var express = require('express');
var passport = require('passport');
var Bearer = require('passport-http-bearer').Strategy;
var Basic = require('passport-http').BasicStrategy
var db = require('./db');



// Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use("bearer",new Bearer(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));



// Configure the Badic strategy for use by Passport.
//
// The Badic strategy requires a `verify` function which receives the
// credentials (`username`,`password`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use("password",new Basic(
  function(username,password, cb) {
    db.users.findByPassword(username,password, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Create a new Express application.
var app = express();

// Configure Express application.
app.use(require('morgan')('combined'));

// use window.btoa("safi:ACDFGBHN") to generate basic64 string  "c2FmaTpBQ0RGR0JITg=="
// curl -v -H "Authorization: Basic c2FmaTpBQ0RGR0JITg==" http://127.0.0.1:3000/basic
// or
// curl -v http://127.0.0.1:3000/basic/?username=safi&password:ACDFGBHN

app.get('/basic/',
  passport.authenticate('password', { session: false }),
  function(req, res) {
    res.json({method:"basic", username: req.user.username, email: req.user.emails[0].value });
  });

// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/bearer/
// curl -v http://127.0.0.1:3000/bearer/?access_token=123456789 
app.get('/bearer/',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json({method:"bearer", username: req.user.username, email: req.user.emails[0].value });
});



app.listen(3000);
