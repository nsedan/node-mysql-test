module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  // Retrieve all Orders
  app.get("/api/orders", orders.getAll);

  // Retrieve specific Order with ID
  app.get("/api/orders/:id", orders.findOne);
};
