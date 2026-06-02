const db = require('../helpers/database/db-connector');

// Local helper function to execute database queries with promise support
const executeQuery = async (query, params = []) => {
    try {
        const [results, fields] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        console.error('Query Error:', err.message);
        throw new Error(err.message);
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Books_With_Availability');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    const { title, author, isbn, publishedYear, genre } = req.body;
    try {
        const result = await executeQuery(
            `INSERT INTO Books (title, author, isbn, publishedYear, genre) VALUES (?, ?, ?, ?, ?)`,
            [title, author, isbn, publishedYear, genre]
        );
        res.json({ message: "Book added successfully!", bookId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBook = async (req, res) => {
    const { isbn } = req.params;
    const { title, author, publishedYear, genre } = req.body;
    try {
        const result = await executeQuery(
            `UPDATE Books SET title = ?, author = ?, publishedYear = ?, genre = ? WHERE isbn = ?`,
            [title, author, publishedYear, genre, isbn]
        );
        if (result.affectedRows) {
            res.json({ message: 'Book updated successfully!' });
        } else {
            res.status(404).json({ message: 'Book not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { isbn } = req.params;
    try {
        await executeQuery('START TRANSACTION');
        const dependencies = await executeQuery('SELECT * FROM Book_Transaction_Details WHERE bookID = (SELECT bookID FROM Books WHERE isbn = ?)', [isbn]);
        if (dependencies.length > 0) {
            await executeQuery('ROLLBACK');
            res.status(400).json({ message: "Cannot delete book because it is referenced in transaction details." });
        } else {
            const result = await executeQuery('DELETE FROM Books WHERE isbn = ?', [isbn]);
            await executeQuery('COMMIT');
            if (result.affectedRows) {
                res.json({ message: "Book deleted successfully!" });
            } else {
                res.status(404).json({ message: "Book not found or already deleted!" });
            }
        }
    } catch (err) {
        await executeQuery('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};
