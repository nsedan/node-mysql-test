module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
  });

  return User;
};
