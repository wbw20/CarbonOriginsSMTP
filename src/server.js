var express = require('express'),
    fs = require('fs'),
    winston = require('winston');

var dao = require('./dao');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

var app = express();
app.use(express.bodyParser());
dao.setup();

app.get('/news', function(req, res) {
  dao.get(function(rows) {
    res.send(rows);
  });
});

app.post('/news', function(req, res) {
  dao.add({
    name: req.body.name,
    email: req.body.email
  });

  res.send(200);
});

app.listen(3000);
