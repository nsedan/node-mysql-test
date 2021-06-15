require('dotenv').config();
const express = require('express');
const cors = require('cors')
const config = require(`./config/config`);
const mysql = require('mysql2');

const PORT = process.env.PORT;

const app = express();
app.use(cors())

const externalDB = config.development.databases.db1;
const internalDB = config.development.databases.db2;

// Connection
const db = mysql.createConnection({
    host: externalDB.host,
    user: externalDB.user,
    password: externalDB.password,
    database: externalDB.database,
    port: externalDB.port
});

const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize({
    host: internalDB.host,
    username: internalDB.user,
    password: internalDB.password,
    database: internalDB.database,
    port: internalDB.port,
    dialect: 'mysql'
});

// sequelize.sync().then(function () {
//     console.log('===================================');
//     console.log('DB connection sucessful.');
//     console.log('You can start working.');
// }, function (err) {
//     console.log('===================================');
//     console.log('There was an error while trying to connect to the DB');
//     console.log(err);
// },);

const User = sequelize.define("User", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'red'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

const sync = (async () => {
    // await sequelize.drop(); // drop User table
    // const jane = await User.create({name: "Jane", age: 25, cash: 5000});
    // console.log(jane.toJSON());
    const users = await User.findAll();
    // console.log("All users:", JSON.stringify(users, null, 2));
})();

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (e) {
        console.log(e)
        res.send('Users not found!')
    }

})

// Connect
db.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('===========CONNECTING==============');
    console.log('DB connection sucessful.');
});

// SCE10 tests
app.get('/api/orderstatus', async (req, res) => {
    let orderStatusSetup = [
      { serialkey: 3, description: "Empty Order" },
      { serialkey: 4, description: "Created Externally" },
      { serialkey: 5, description: "Created Internally" },
      { serialkey: 37, description: "Did Not Allocate" },
      { serialkey: 6, description: "Converted" },
      { serialkey: 7, description: "Not Started" },
      { serialkey: 21, description: "Unknown" },
      { serialkey: 39, description: "Batched" },
      { serialkey: 8, description: "Part Pre-allocated" },
      { serialkey: 9, description: "Pre-allocated" },
      { serialkey: 33, description: "Released to WareHouse Planner" },
      { serialkey: 10, description: "Part Allocated" },
      { serialkey: 11, description: "Part Allocated / Part Picked" },
      { serialkey: 12, description: "Part Allocated / Part Shipped" },
      { serialkey: 13, description: "Allocated" },
      { serialkey: 14, description: "Substituted" },
      { serialkey: 12, description: "OutOfSync" },
      { serialkey: 34, description: "Part Released" },
      { serialkey: 35, description: "Part Released/Part Picked" },
      { serialkey: 36, description: "Part Released/Part Shipped" },
      { serialkey: 15, description: "Released" },
      { serialkey: 16, description: "In Picking" },
      { serialkey: 17, description: "Part Picked" },
      { serialkey: 18, description: "Part Picked / Part Shipped" },
      { serialkey: 19, description: "Picked Complete" },
      { serialkey: 20, description: "Picked / Part Shipped" },
      { serialkey: 21, description: "In Packing" },
      { serialkey: 22, description: "Pack Complete" },
      { serialkey: 23, description: "Staged" },
      { serialkey: 24, description: "Manifested" },
      { serialkey: 25, description: "In Loading" },
      { serialkey: 26, description: "Loaded" },
      { serialkey: 27, description: "Part Shipped" },
      { serialkey: 38, description: "Close Production" },
      { serialkey: 28, description: "Shipped Complete" },
      { serialkey: 29, description: "Delivered Accepted" },
      { serialkey: 30, description: "Delivered Rejected" },
      { serialkey: 31, description: "Cancelled Externally" },
      { serialkey: 32, description: "Cancelled Internally" },
    ];

    try {
        res.json(orderStatusSetup)
    } catch (e) {
        console.log(e)
        res.send('Not found!')
    }
})

// OPC tests
app.get('/api/posts', (req, res) => {
    let sql = `SELECT *
                FROM wp_posts
                LIMIT 50`;
    db.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        res.json(results)
        console.log(`Success`)

        let data = JSON.parse(JSON.stringify(results))
        console.log(data)
    });
})

app.get('/api/products', (req, res) => {
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
        res.json(results)
        console.log(`Success`)
    });
})


app.get('/api/orders', (req, res) => {
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
        res.send(results)
    });
})

app.get('/api/customer/:id/orders/', (req, res) => {
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
    let customerID = req.params.id
    db.query(sql, customerID, function (err, results) {
        if (err) {
            throw err;
        }
        res.send(results)
    });
})

app.get('/api/order/:id', (req, res) => {
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
    let orderID = req.params.id
    db.query(sql, orderID, function (err, results) {
        if (err) {
            throw err;
        }
        res.send(results)
    });
})

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log('===================================');
    console.log('Server started');
    console.log(`Listening on ${PORT}`);
});
