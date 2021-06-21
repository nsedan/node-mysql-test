module.exports = {
  development: {
    databases: {
      db1: {
        host: process.env.DB_HOST1,
        user: process.env.DB_USER1,
        password: process.env.DB_PASS1,
        database: process.env.DB_NAME1,
        port: process.env.DB_PORT1,
      },
      db2: {
        host: process.env.DB_HOST2,
        user: process.env.DB_USER2,
        password: process.env.DB_PASS2,
        database: process.env.DB_NAME2,
        port: process.env.DB_PORT2,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          bigNumberStrings: true,
        },
      },
    },
  },
};
