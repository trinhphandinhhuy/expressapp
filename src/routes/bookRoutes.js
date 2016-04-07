var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookRouter = express.Router();


module.exports = function(nav){
  var bookService = require('../services/goodreadsService')();
  var bookController = require('../controllers/bookController')(bookService, nav);
  //you have to sign in before you can do anything with the book section
  bookRouter.use(bookController.middleware);

  bookRouter.route('/').get(bookController.getIndex);

  bookRouter.route('/:id').get(bookController.getById);
  return bookRouter;
};
