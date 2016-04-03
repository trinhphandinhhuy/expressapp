var express = require('express');

var app = express();

var port = 3000;

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {title: 'Hello from the other side', nav : ['Books', 'Authors']});
});
app.listen(port, function (err) {
  console.log('Running server on port : ' + port);
});
