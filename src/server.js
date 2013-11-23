var express = require('express'),
    fs = require('fs'),
    winston = require('winston'),
    emailjs = require('emailjs');

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

var credentials = JSON.parse(fs.readFileSync('conf/properties.json').toString());
var email  = emailjs.server.connect({
   user:     credentials.email.user, 
   password: credentials.email.password, 
   host:     credentials.email.host, 
   ssl:      credentials.email.ssl
});

var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));
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

app.post('/email', function(req, res) {
  dao.get(function(rows) {
    rows.forEach(function(row) {
      email.send({
        text:    req.body.text,
        from:    "Carbon Origins Team <team@carbonorigins.com>", 
        to:      row.email;
        subject: req.body.subject;
      }, function(error, message) {
        if (error) {
          console.log(error);
        }
      });
    })
  });

  res.send(200);
});

app.listen(3000);
