const express = require('express');
const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

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
        throw err;
    }
    console.log("MySQL connected");
});

/*
// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res)
    })
})

// Create TABLE
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('Table created')
    })
})

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {
        title: 'post one',
        body: 'This is post number one'
    }
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('post 1 added...')
    })
})

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {
        title: 'post two',
        body: 'This is post number two'
    }
    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('post 2 added...')
    })
})

// Fetch all posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, function (err, results,) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('posts fetched')
    });
})

// Fetch single posts
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${
        req.params.id
    }`;
    let query = db.query(sql, function (err, result,) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('post fetched')
    });
})

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${
        req.params.id
    }`
    let query = db.query(sql, function (err, result,) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Post updated')
    });
})

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${
        req.params.id
    }`
    let query = db.query(sql, function (err, result,) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Post deleted')
    });
})
*/

// OPC tests
app.get('/api/v1/getposts', (req, res) => {
    let sql = `SELECT posts.ID, postmeta.meta_key, postmeta.meta_value
                FROM wp_posts as posts
                LEFT JOIN wp_postmeta as postmeta
                ON posts.ID = postmeta.post_id
                WHERE posts.post_type = "product"
                AND postmeta.meta_key = "_sku"
                LIMIT 50`;
    let query = db.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        res.json(results)
        console.log(`Success`)
        
        let data = JSON.parse(JSON.stringify(results))
        console.log(data)
    });
})


app.get('/', (req, res) => {
    res.send('Server running on port 3000')
})

app.listen(3000, () => {
    console.log('serving running on port 3000');
});
