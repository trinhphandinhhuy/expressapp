var express = require('express');

var app = express();

var port = 3000;

app.use

app.get('/', function (req, res) {
  res.send('Lan va Diep');
});
app.listen(port, function (err) {
  console.log('Running server on port : ' + port);
});
