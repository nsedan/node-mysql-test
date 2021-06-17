module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(320),
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
  });

  return User;
};
