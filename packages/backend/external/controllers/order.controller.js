const db = require("../connection");

// Retrieve all Orders
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

// Retrieve specific Order with ID
exports.getOne = (req, res) => {
  const orderID = req.params.id;

  const sql = `SELECT 
                    orders.order_id,
                    order_items.order_item_id,
                    order_items.order_item_name,
                    order_items.order_item_type,
                    MAX(CASE WHEN (order_item_meta.meta_key='_product_id') THEN order_item_meta.meta_value ELSE NULL END) AS 'product_id',
                    MAX(CASE WHEN (order_item_meta.meta_key='_qty') THEN order_item_meta.meta_value ELSE NULL END) AS 'qty',
                    MAX(CASE WHEN (order_item_meta.meta_key='_line_total') THEN order_item_meta.meta_value ELSE NULL END) AS 'line_total',
                    MAX(CASE WHEN (order_item_meta.meta_key='_line_tax') THEN order_item_meta.meta_value ELSE NULL END) AS 'line_tax'
                FROM wp_wc_order_stats AS orders
                JOIN wp_woocommerce_order_items AS order_items
                    ON orders.order_id = order_items.order_id
                JOIN wp_woocommerce_order_itemmeta AS order_item_meta
                    ON order_item_meta.order_item_id = order_items.order_item_id
                WHERE orders.order_id = ?
                GROUP BY order_items.order_item_id`;

  db.query(sql, orderID, async (err, results) => {
    if (err) {
      throw err;
    }
    await res.send(results);
  });
};
