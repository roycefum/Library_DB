/* SETUP */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = 9125;

// Enable CORS for all routes
app.use(cors());

// Enable parsing of JSON bodies in POST requests
app.use(express.json());

// Database
const db = require('./database/db-connector');

/* ROUTES*/

// Fetch all books
app.get('/api/books', (req, res) => {
    db.pool.query('SELECT * FROM Books', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, isbn, publishedYear, genre } = req.body;
    const query = `INSERT INTO Books (title, author, isbn, publishedYear, genre) VALUES (?, ?, ?, ?, ?)`;
    db.pool.query(query, [title, author, isbn, publishedYear, genre], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Book added successfully!", bookId: result.insertId });
    });
});

// Delete a book
app.delete('/api/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const query = `DELETE FROM Books WHERE isbn = ?`;
    db.pool.query(query, [isbn], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows) {
            res.json({ message: "Book deleted successfully!" });
        } else {
            res.status(404).json({ message: "Book not found!" });
        }
    });
});

// Setup HTTPS server
const options = {
    key: fs.readFileSync('./keys_dev/key.pem'),
    cert: fs.readFileSync('./keys_dev/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
