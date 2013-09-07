var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');

module.exports = Object.freeze({
  setup: function() {
    db.run(
      'create table buy (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);  ' +
      'create table sell (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);  ' +
      'insert into buy values (1, \'Will\', 3.50);  ' +
      'insert into sell values (1, \'Charles\', 4.25);');
  },
  buys: function(callback, options) {
    db.all('select * from buy;', function(error, rows) {
      callback(rows);
    });
  },
  sells: function(callback, options) {
    db.all('select * from sells;', function(error, rows) {
      callback(rows);
    });
  }
});
