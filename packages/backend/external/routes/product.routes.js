module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  // Retrieve all Products
  app.get("/api/products", products.getAll);
};
