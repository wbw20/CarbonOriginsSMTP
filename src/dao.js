var mysql = require('mysql'),
    fs = require('fs');

var properties = JSON.parse(fs.readFileSync(__dirname + '/../conf/properties.json'));

function connect(callback) {
  var connection = mysql.createConnection({
    database : properties.database,
    host     : properties.host,
    user     : properties.username,
    password : properties.password,
  });

  connection.connect();
  callback(connection);
}

module.exports = Object.freeze({
  setup: function() {
    connect(function(connection) {
      connection.query(
      'create table if not exists buy (' +
        'id integer primary key auto_increment, ' +
        'name text, ' +
        'price real);');
      connection.query(
        'create table if not exists sell (' +
          'id integer primary key auto_increment, ' +
          'name text, ' +
          'price real);');
    });
  },

  /* Getters */
  buys: function(callback, options) {
    connect(function(connection) {
      connection.query('select * from buy;', function(error, rows) {
        callback(rows);
      });
    });
  },
  sells: function(callback, options) {
    connect(function(connection) {
      connection.query('select * from sells;', function(error, rows) {
        callback(rows);
      });
    });
  },

  /* Setters */
  buy: function(entity, options) {
    connect(function(connection) {
      connection.query('insert into buy (name, price) values (\'' + entity.name +  '\', ' + entity.price + ');');
    });
  },
  sell: function(entity, options) {
    connect(function(connection) {
        connection.query('insert into sell (name, price) values (\'' + entity.name +  '\', ' + entity.price + ');');
    });
  }
});
