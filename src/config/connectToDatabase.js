const mysql = require('mysql');
const config = require('../config/config');


const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});
connection.connect();
console.log('Подключение к базе данных произошло успешно');

module.exports = connection;
