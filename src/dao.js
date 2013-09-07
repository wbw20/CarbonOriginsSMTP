var mysql = require('mysql'),
    fs = require('fs');
var db = new sqlite3.Database(':memory:');

function connect(callback) {
  fs.readFile('../conf/properties.json', function(properties) {
    var json = JSON.parse(properties);
    var connection = mysql.createConnection({
      host     : json.host,
      user     : json.user,
      password : json.password,
    });
  });
}

module.exports = Object.freeze({
  setup: function() {
    db.run(
      'create table buy (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);');
    db.run(
      'create table sell (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);');
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
