require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require(`./config/config`);
const mysql = require("mysql2");

const PORT = process.env.PORT;

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());

const externalDB = config.development.databases.db1;

/*
 *   SEQUELIZE
 */
const seqConnection = require("./sequelize/connection");
seqConnection.sequelize.sync();
require("./sequelize/routes/user.routes")(app);
// seqConnection.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

/*
 *   MYSQL
 */

// Connection
const db = mysql.createConnection({
  multipleStatements: true,
  host: externalDB.host,
  user: externalDB.user,
  password: externalDB.password,
  database: externalDB.database,
  port: externalDB.port,
});

// Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("===========CONNECTING==============");
  console.log("DB connection sucessful.");
});

// SCE10 tests
app.get("/api/orderstatus", async (req, res) => {
  let orderStatusSetup = [
    {
      serialkey: 3,
      description: "Empty Order",
    },
    {
      serialkey: 4,
      description: "Created Externally",
    },
    {
      serialkey: 5,
      description: "Created Internally",
    },
    {
      serialkey: 37,
      description: "Did Not Allocate",
    },
    {
      serialkey: 6,
      description: "Converted",
    },
    {
      serialkey: 7,
      description: "Not Started",
    },
    {
      serialkey: 21,
      description: "Unknown",
    },
    {
      serialkey: 39,
      description: "Batched",
    },
    {
      serialkey: 8,
      description: "Part Pre-allocated",
    },
    {
      serialkey: 9,
      description: "Pre-allocated",
    },
    {
      serialkey: 33,
      description: "Released to WareHouse Planner",
    },
    {
      serialkey: 10,
      description: "Part Allocated",
    },
    {
      serialkey: 11,
      description: "Part Allocated / Part Picked",
    },
    {
      serialkey: 12,
      description: "Part Allocated / Part Shipped",
    },
    {
      serialkey: 13,
      description: "Allocated",
    },
    {
      serialkey: 14,
      description: "Substituted",
    },
    {
      serialkey: 12,
      description: "OutOfSync",
    },
    {
      serialkey: 34,
      description: "Part Released",
    },
    {
      serialkey: 35,
      description: "Part Released/Part Picked",
    },
    {
      serialkey: 36,
      description: "Part Released/Part Shipped",
    },
    {
      serialkey: 15,
      description: "Released",
    },
    {
      serialkey: 16,
      description: "In Picking",
    },
    {
      serialkey: 17,
      description: "Part Picked",
    },
    {
      serialkey: 18,
      description: "Part Picked / Part Shipped",
    },
    {
      serialkey: 19,
      description: "Picked Complete",
    },
    {
      serialkey: 20,
      description: "Picked / Part Shipped",
    },
    {
      serialkey: 21,
      description: "In Packing",
    },
    {
      serialkey: 22,
      description: "Pack Complete",
    },
    {
      serialkey: 23,
      description: "Staged",
    },
    {
      serialkey: 24,
      description: "Manifested",
    },
    {
      serialkey: 25,
      description: "In Loading",
    },
    {
      serialkey: 26,
      description: "Loaded",
    },
    {
      serialkey: 27,
      description: "Part Shipped",
    },
    {
      serialkey: 38,
      description: "Close Production",
    },
    {
      serialkey: 28,
      description: "Shipped Complete",
    },
    {
      serialkey: 29,
      description: "Delivered Accepted",
    },
    {
      serialkey: 30,
      description: "Delivered Rejected",
    },
    {
      serialkey: 31,
      description: "Cancelled Externally",
    },
    {
      serialkey: 32,
      description: "Cancelled Internally",
    },
  ];

  try {
    res.json(orderStatusSetup);
  } catch (e) {
    console.log(e);
    res.send("Not found!");
  }
});

// OPC tests
app.get("/api/posts", (req, res) => {
  const sql = [
    `SELECT 
                    orders.order_id,
                    orders.customer_id,
                    orders.date_created,
                    orders.status
                FROM wp_wc_order_stats AS orders
                ORDER BY orders.order_id DESC
                LIMIT 5`,
    `SELECT 
                    posts.ID,
                    posts.post_title,
                    posts.post_status
                FROM wp_posts as posts
                LIMIT 5`,
  ];

  db.query(sql.join(";"), (err, results) => {
    if (err) {
      throw err;
    }
    const data1 = JSON.parse(JSON.stringify(results[0]));
    const data2 = JSON.parse(JSON.stringify(results[1]));
    let dataArray = [];

    data1.map((o) => {
      dataArray = [
        ...dataArray,
        {
          order_id: o.order_id,
          status: o.status,
        },
      ];
    });
    res.send(results);
  });
});

app.get("/api/products", (req, res) => {
  let sql = `SELECT postmeta.post_id as product_id,
                    MAX(CASE WHEN (postmeta.meta_key='_sku') THEN postmeta.meta_value ELSE NULL END) AS 'sku',
                    MAX(CASE WHEN (postmeta.meta_key='unit_cost') THEN postmeta.meta_value ELSE NULL END) AS 'unit_cost',
                    MAX(CASE WHEN (postmeta.meta_key='per_pack') THEN postmeta.meta_value ELSE NULL END) AS 'per_pack',
                    MAX(CASE WHEN (postmeta.meta_key='per_carton') THEN postmeta.meta_value ELSE NULL END) AS 'per_carton',
                    MAX(CASE WHEN (postmeta.meta_key='finishes') THEN postmeta.meta_value ELSE NULL END) AS 'finishes',
                    MAX(CASE WHEN (postmeta.meta_key='packing') THEN postmeta.meta_value ELSE NULL END) AS 'packing',
                    MAX(CASE WHEN (postmeta.meta_key='material') THEN postmeta.meta_value ELSE NULL END) AS 'material'
                FROM wp_postmeta as postmeta
                JOIN wp_posts as posts
                    ON posts.ID = postmeta.post_id
                WHERE posts.post_type = "product"
                GROUP BY postmeta.post_id
                ORDER BY postmeta.post_id DESC`;
  db.query(sql, function (err, results) {
    if (err) {
      throw err;
    }
    res.json(results);
    console.log(`Success`);
  });
});

app.get("/api/orders", (req, res) => {
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
                ORDER BY orders.order_id DESC`;
  db.query(sql, function (err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

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
  db.query(sql, customerID, function (err, results) {
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
  db.query(sql, orderID, function (err, results) {
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
