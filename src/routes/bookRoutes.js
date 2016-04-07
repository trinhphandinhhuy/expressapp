var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookRouter = express.Router();

module.exports = function(nav){
  //you have to sign in before you can do anything with the book section
  bookRouter.use(function (req, res, next) {
    if(!req.user){
      res.redirect('/');
    }
    next();
  });

  bookRouter.route('/').get(function (req, res) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('books');
      collection.find({}).toArray(function (err, results) {
        res.render('bookListView', {title: 'Books here', nav : nav,
        books: results
        });
      });
    });
  });

  bookRouter.route('/:id').get(function (req, res) {
    var id = new objectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function (err, db) {
      var collection = db.collection('books');
      collection.findOne({_id : id}, function (err, results) {
        res.render('bookView', {title: 'Books here', nav : nav,
        book: results
        });
      });
    });
  });
  return bookRouter;
};
