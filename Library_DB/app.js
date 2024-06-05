// SETUP
const express = require('express');
const cors = require('cors');
const db = require('./database/db-connector');

const app = express();
const PORT = 3000; // Common practice to use a standard local port like 3000

// Middleware to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper function to execute database queries with promise support
const executeQuery = async (query, params = []) => {
    try {
        const [results] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
};

// API Endpoints
// !!! FOR BROWSE_BOOKS.HTML !!! ///

// API endpoint to fetch all books
app.get('/api/books', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Books');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to add a new book
app.post('/api/books', async (req, res) => {
    const { title, author, isbn, publishedYear, genre } = req.body;
    const query = `INSERT INTO Books (title, author, isbn, publishedYear, genre) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = await executeQuery(query, [title, author, isbn, publishedYear, genre]);
        res.json({ message: "Book added successfully!", bookId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to update a book by ISBN
app.put('/api/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const { title, author, publishedYear, genre } = req.body;
    const query = `UPDATE Books SET title = ?, author = ?, publishedYear = ?, genre = ? WHERE isbn = ?`;
    try {
        const result = await executeQuery(query, [title, author, publishedYear, genre, isbn]);
        if (result.affectedRows) {
            res.json({ message: "Book updated successfully!" });
        } else {
            res.status(404).json({ message: "Book not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete a book by ISBN
app.delete('/api/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        // Start a transaction
        await db.pool.query('START TRANSACTION');
        // Check for dependent entries in Book_Transaction_Details
        const dependencies = await db.pool.query('SELECT * FROM Book_Transaction_Details WHERE bookID = (SELECT bookID FROM Books WHERE isbn = ?)', [isbn]);
        if (dependencies[0].length > 0) {
            // Rollback if dependencies exist
            await db.pool.query('ROLLBACK');
            res.status(400).json({ message: "Cannot delete book because it is referenced in transaction details." });
        } else {
            // Proceed with deletion if no dependencies
            const result = await db.pool.query('DELETE FROM Books WHERE isbn = ?', [isbn]);
            // Commit the transaction
            await db.pool.query('COMMIT');
            if (result.affectedRows) {
                res.json({ message: "Book deleted successfully!" });
            } else {
                res.status(404).json({ message: "Book not found or already deleted!" });
            }
        }
    } catch (err) {
        // Rollback the transaction in case of any error
        await db.pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});

// !!! FOR BROWSE_PATRONS.HTML !!! ///

// API endpoint to fetch all patrons
app.get('/api/patrons', async (req, res) => {
    try {
        const results = await db.pool.query('SELECT * FROM Patrons');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to add a new patron
app.post('/api/patrons', async (req, res) => {
    const { firstName, lastName, email, membershipDate } = req.body;
    try {
        const query = 'INSERT INTO Patrons (first_name, last_name, email, membershipDate) VALUES (?, ?, ?, ?)';
        const result = await db.pool.query(query, [firstName, lastName, email, membershipDate]);
        res.json({ message: "Patron added successfully!", patronId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete a patron by patronID
app.delete('/api/patrons/:patronID', async (req, res) => {
    const { patronID } = req.params;
    try {
        const result = await db.pool.query('DELETE FROM Patrons WHERE patronID = ?', [patronID]);
        if (result.affectedRows) {
            res.json({ message: "Patron deleted successfully!" });
        } else {
            res.status(404).json({ message: "Patron not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !!! FOR VIEW_BOOK_TRANSACTION.HTML !!! ///

// API endpoint to fetch all book transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Book_Transactions');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to add a new book transaction
app.post('/api/transactions', async (req, res) => {
    const { patronID, numberBooks, staffID, date } = req.body;
    try {
        const query = 'INSERT INTO Book_Transactions (patronID, numberBooks, staffID, date) VALUES (?, ?, ?, ?)';
        const result = await executeQuery(query, [patronID, numberBooks, staffID, date]);
        res.json({ message: "Transaction added successfully!", transactionID: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete a book transaction by transactionID
app.delete('/api/transactions/:transactionID', async (req, res) => {
    const { transactionID } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Book_Transactions WHERE transactionID = ?', [transactionID]);
        if (result.affectedRows) {
            res.json({ message: "Transaction deleted successfully!" });
        } else {
            res.status(404).json({ message: "Transaction not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !!! FOR VIEW_PATRON_ATTENDANCE.HTML !!! ///

// API endpoint to fetch all event attendances
app.get('/api/attendances', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Patron_Events_Attendance');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to add a new event attendance
app.post('/api/attendances', async (req, res) => {
    const { patronID, eventID } = req.body;
    try {
        const query = 'INSERT INTO Patron_Events_Attendance (patronID, eventID) VALUES (?, ?)';
        const result = await executeQuery(query, [patronID, eventID]);
        res.json({ message: "Attendance added successfully!", eventsDetailID: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete an event attendance by eventsDetailID
app.delete('/api/attendances/:eventsDetailID', async (req, res) => {
    const { eventsDetailID } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Patron_Events_Attendance WHERE eventsDetailID = ?', [eventsDetailID]);
        if (result.affectedRows) {
            res.json({ message: "Attendance deleted successfully!" });
        } else {
            res.status(404).json({ message: "Attendance not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !!! FOR VIEW_PATRON_EVENT.HTML !!! ///

// API endpoint to fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Patron_Events');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to add a new event
app.post('/api/events', async (req, res) => {
    const { eventName, event_Date, description, attendance, staffID } = req.body;
    try {
        const query = 'INSERT INTO Patron_Events (eventName, event_Date, description, attendance, staffID) VALUES (?, ?, ?, ?, ?)';
        const result = await executeQuery(query, [eventName, event_Date, description, attendance, staffID]);
        res.json({ message: "Event added successfully!", eventId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete an event by eventId
app.delete('/api/events/:eventID', async (req, res) => {
    const { eventID } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Patron_Events WHERE eventID = ?', [eventID]);
        if (result.affectedRows) {
            res.json({ message: "Event deleted successfully!" });
        } else {
            res.status(404).json({ message: "Event not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// !!! FOR VIEW_STAFF.HTML !!! ///

// API endpoint to fetch all staff members
app.get('/api/staff', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Staff');
        res.json(results.map(staff => ({
            staffId: staff.staffID,
            firstName: staff.first_name,
            lastName: staff.last_name,
            position: staff.position
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to delete a staff member by staffID
app.delete('/api/staff/:staffId', async (req, res) => {
    const { staffId } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Staff WHERE staffID = ?', [staffId]);
        if (result.affectedRows) {
            res.json({ message: "Staff member deleted successfully!" });
        } else {
            res.status(404).json({ message: "Staff member not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listen on HTTP instead of HTTPS
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
