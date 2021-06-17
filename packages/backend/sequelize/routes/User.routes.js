module.exports = (app) => {
  const users = require("../controllers/User.controller.js");

  // Create a new User
  app.post("/api/users", users.create);

  // Retrieve all Users
  app.get("/api/users", users.findAll);

  // Retrieve all published Users
  app.get("/api/users/published", users.findAllPublished);

  // Retrieve a single User with id
  app.get("/api/users/:id", users.findOne);

  // Update a User with id
  app.put("/api/users/:id", users.update);

  // Delete a User with id
  app.delete("/api/users/:id", users.delete);

  // Delete all Users
  app.delete("/api/users", users.deleteAll);
};
