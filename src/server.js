var express = require('express'),
    fs = require('fs');

var app = express();

app.get('/buy', function(req, res) {
  res.send('going to be a list of buy orders');
});

app.get('/sell', function(req, res) {
  res.send('going to be a list of sell orders');
});

app.listen(8080);
