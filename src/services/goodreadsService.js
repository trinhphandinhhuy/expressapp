var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

module.exports = function () {
  var getBookById = function (id, cb) {
    var options = {
      host: 'www.goodreads.com',
      path: '/book/show/656?format=xml&key=RoSTzq8pDZ1Dp0rcP1qg'
    };
    var callback = function(res){
      var str='';
      res.on('data', function (chunk) {
        str += chunk;
      });
      res.on('end', function () {
        console.log(str);
        parser.parseString(str, function (err, result) {
          cb(null, result.GoodreadsResponse.book);
        });
      });
    };

    http.request(options, callback).end();
  };
  return {
    getBookById : getBookById
  };
};
