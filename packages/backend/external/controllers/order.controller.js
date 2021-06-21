const db = require("../connection");

// Retrieve all Orders from the database.
exports.getAll = (req, res) => {
  const customerID = req.query.customer_id;

  const where = customerID !== undefined ? `WHERE orders.customer_id = ?` : "";

  const sql = `SELECT 
                    orders.order_id,
                    orders.customer_id,
                    orders.date_created,
                    orders.status,
                    orders.num_items_sold,
                    orders.total_sales,
                    orders.tax_total,
                    orders.shipping_total,
                    orders.net_total
                FROM wp_wc_order_stats AS orders
                ${where}
                ORDER BY orders.order_id DESC`;

  db.query(sql, customerID, async (err, results) => {
    if (err) {
      throw err;
    }
    await res.send(results);
  });
};
