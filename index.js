var express = require('express');

var app = express();

var port = 3000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function (req, res) {
  res.send('Lan va Diep');
});
app.listen(port, function (err) {
  console.log('Running server on port : ' + port);
});
