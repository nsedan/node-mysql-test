require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

/*
 *   SEQUELIZE
 */
const seqConnection = require("./sequelize/connection");
// Connect
seqConnection.sequelize.sync().then(() => {
  console.log("============SEQUELIZE==============");
  console.log("DB connection sucessful.");
});
// Routes
require("./sequelize/routes/user.routes")(app);
// seqConnection.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

/*
 *   MYSQL
 */
const externalConnection = require("./external/connection");
// Connect
externalConnection.connect(() => {
  console.log("==============MYSQL================");
  console.log("DB connection sucessful.");
});
// Routes
require("./external/routes/product.routes")(app);
require("./external/routes/order.routes")(app);

// // OPC tests
// app.get("/api/posts", (req, res) => {
//   const sql = [
//     `SELECT
//                     orders.order_id,
//                     orders.customer_id,
//                     orders.date_created,
//                     orders.status
//                 FROM wp_wc_order_stats AS orders
//                 ORDER BY orders.order_id DESC
//                 LIMIT 5`,
//     `SELECT
//                     posts.ID,
//                     posts.post_title,
//                     posts.post_status
//                 FROM wp_posts as posts
//                 LIMIT 5`,
//   ];

//   externalConnection.query(sql.join(";"), (err, results) => {
//     if (err) {
//       throw err;
//     }
//     const data1 = JSON.parse(JSON.stringify(results[0]));
//     const data2 = JSON.parse(JSON.stringify(results[1]));
//     let dataArray = [];

//     data1.map((o) => {
//       dataArray = [
//         ...dataArray,
//         {
//           order_id: o.order_id,
//           status: o.status,
//         },
//       ];
//     });
//     res.send(results);
//   });
// });

app.get("/api/customer/:id/orders/", (req, res) => {
  let sql = `SELECT 
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
                WHERE orders.customer_id = ?`;
  let customerID = req.params.id;
  externalConnection.query(sql, customerID, function (err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/api/order/:id", (req, res) => {
  let sql = `SELECT 
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
  let orderID = req.params.id;
  externalConnection.query(sql, orderID, function (err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log("===================================");
  console.log("Server started");
  console.log(`Listening on ${PORT}`);
});
