var mysql = require('mysql'),
    fs = require('fs');

var properties = JSON.parse(fs.readFileSync(__dirname + '/../conf/properties.json'));

function connect(callback) {
  var connection = mysql.createConnection({
    database : properties.db.database,
    host     : properties.db.host,
    user     : properties.db.username,
    password : properties.db.password,
  });

  connection.connect();
  callback(connection);
}

module.exports = Object.freeze({
  setup: function() {
    connect(function(connection) {
      connection.query(
      'create table if not exists people (' +
        'id integer primary key auto_increment, ' +
        'name varchar(64), ' +
        'email varchar(128));');
    });
  },

  /* Getters */
  get: function(callback, options) {
    connect(function(connection) {
      connection.query('select * from people;', function(error, rows) {
        callback(rows);
      });
    });
  },

  /* Setters */
  add: function(entity, options) {
    connect(function(connection) {
      connection.query('insert into people (name, email) values (\'' + entity.name +  '\', ' + '\'' + entity.email + '\'' + ');');
    });

    return entity;
  }
});
