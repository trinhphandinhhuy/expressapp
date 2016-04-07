var express = require('express');
var mongodb = require('mongodb').MongoClient;
var authRouter = express.Router();
var passport = require('passport');

module.exports = function () {
  authRouter.route('/signUp')
  .post(function (req, res) {
    console.log(req.body);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('users');
      var user = {
        username: req.body.userName,
        password: req.body.password
      };

      collection.insert(user, function (err, results) {
        req.login(results.ops[0], function () {
          res.redirect('/Auth/profile');
        });
      });
    });

  });

  authRouter.route('/signIn')
  .post(passport.authenticate('local', {
    failureRedirect: '/'
  }), function (req, res) {
    res.redirect('/Auth/profile');
  });

  authRouter.route('/profile')
  .all(function (req, res, next) {
    if(!req.user){
      res.redirect('/');
    }
    next();
  })
  .get(function (req, res) {
    res.json(req.user);
  });
  return authRouter;
};
