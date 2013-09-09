var express = require('express'),
    fs = require('fs');

var dao = require('./dao');

var app = express();
app.use(express.bodyParser());
dao.setup();

app.get('/buy', function(req, res) {
  dao.buys(function(rows) {
    res.send({
      "buys": JSON.stringify(rows)
    });
  });
});

app.post('/buy', function(req, res) {
  dao.buy({
    name: req.body.name,
    price: req.body.price
  });
  res.send(200);
});

app.get('/sell', function(req, res) {
  dao.sells(function(rows) {
    res.send({
      "sells": JSON.stringify(rows)
    });
  });
});

app.post('/sell', function(req, res) {
  dao.sell({
    name: req.body.name,
    price: req.body.price
  });
  res.send(200);
});

app.listen(8080);
