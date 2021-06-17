const dbConfig = require(`../config/config`).development.databases.db2;

// Connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  host: dbConfig.host,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  dialect: "mysql",
});

// Export
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add Models
db.user = require("./models/user.model.js")(sequelize, Sequelize);

module.exports = db;
