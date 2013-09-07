var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');

module.exports = Object.freeze({
  setup: function() {
    db.run('create table buy (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);');
    db.run('create table sell (' +
        'id integer primary key autoincrement, ' +
        'name text, ' +
        'price real);');
  },
  seed: function() {

  },
  buys: function(options) {

  },
  sells: function(options) {

  }
});
