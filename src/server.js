var express = require('express'),
    fs = require('fs');

var app = express();
app.use(express.bodyParser());

app.get('/buy', function(req, res) {
  res.send({
    "message": 'going to be a list of buy orders'
  });
});

app.post('/buy', function(req, res) {
  console.log(req.body);
  res.send(200);
});

app.get('/sell', function(req, res) {
  res.send({
    "message": 'going to be a list of sell orders'
  });
});

app.post('/sell', function(req, res) {
  console.log(req.body);
  res.send(200);
});

app.listen(8080);
