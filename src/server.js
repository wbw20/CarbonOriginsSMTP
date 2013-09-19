var express = require('express'),
    fs = require('fs');

var dao = require('./dao');

var app = express();
app.use(express.bodyParser());
dao.setup();

app.get('/buy', function(req, res) {
  dao.buys(function(rows) {
    res.send(rows);
  });
});

app.post('/buy', function(req, res) {
  res.send(dao.buy({
    name: req.body.name,
    price: req.body.price
  }));
});

app.get('/sell', function(req, res) {
  dao.sells(function(rows) {
    res.send(rows);
  });
});

app.post('/sell', function(req, res) {
  res.send(dao.sell({
    name: req.body.name,
    price: req.body.price
  }));
});

app.listen(8080);
