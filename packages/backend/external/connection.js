const dbConfig = require(`../config/config`).development.databases.db1;
const mysql = require("mysql2");

// Connection
const db = mysql.createConnection({
  multipleStatements: true,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
});

// Export
module.exports = db;
