module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  // Retrieve all Orders
  app.get("/api/orders", orders.getAll);
};
