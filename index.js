const express = require('express');
const mysql = require('mysql');

const app = express();

// Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    port: 8889
});

// Connect
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("MySQL connected");
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res)
    })
})

// Create TABLE
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
        }
        console.log(result);
        res.send('post fetched')
    });
})

// Update post
app.get('/updatepost/:id', (req, res) =>{
    let newTitle = 'Updated title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
    let query = db.query(sql, function (err, result,) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('Post updated')
    });
})

// Delete post
app.get('/deletepost/:id', (req, res) =>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, function (err, result,) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('Post deleted')
    });
})


app.get('/', (req, res) => {
    res.send('Server running on port 3000')
})

app.listen(3000, () => {
    console.log('serving running on port 3000');
});