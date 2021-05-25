const express = require('express');
const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

const app = express();
const cors = require('cors')
app.use(cors())


// Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect
db.connect((err) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while connecting to DB."
        });
        res.status(400).send({
            message: err.message || "Not found."
        });
    }
    console.log('===================================');
    console.log('DB connection sucessful.');
});

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
