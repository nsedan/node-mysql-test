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
const extConnection = require("./external/connection");
// Connect
extConnection.connect(() => {
  console.log("==============MYSQL================");
  console.log("DB connection sucessful.");
});
// Routes
require("./external/routes/product.routes")(app);
require("./external/routes/order.routes")(app);

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log("===================================");
  console.log("Server started");
  console.log(`Listening on ${PORT}`);
});

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
