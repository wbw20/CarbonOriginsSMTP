var mysql = require('mysql'),
    fs = require('fs');

var properties = JSON.parse(fs.readFileSync('../conf/properties.json'));

function connect(callback) {
  var connection = mysql.createConnection({
    host     : json.host,
    user     : json.user,
    password : json.password,
  });

  connection.connect();
  callback(connection);
}

module.exports = Object.freeze({
  setup: function() {
    connect(function(connection) {
      connection.query(
      'create table buy (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);');
      connection.query(
        'create table sell (' +
          'id integer primary key autoincrement, ' +
          'name text, ' +
          'price real);');
    });
  },

  /* Getters */
  buys: function(callback, options) {
    db.all('select * from buy;', function(error, rows) {
      callback(rows);
    });
  },
  sells: function(callback, options) {
    db.all('select * from sells;', function(error, rows) {
      callback(rows);
    });
  },

  /* Setters */
  buy: function(entity, options) {
    console.log('insert into buy (name, price) values (' + entity.name +  ', ' + entity.price + ');');
    db.run('insert into buy (name, price) values (' + entity.name +  ', ' + entity.price + ');');
  },
  sell: function(entity, options) {
    db.run('insert into sell (name, price) values (' + entity.name +  ', ' + entity.price + ');');
  }
});
