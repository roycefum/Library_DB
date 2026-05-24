const db = require('../helpers/database/db-connector');

const executeQuery = async (query, params = []) => {
    try {
        const [results] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getAllTransactionDetails = async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Book_Transaction_Details');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all books currently checked out by a patron
exports.getCheckedOutByPatron = async (req, res) => {
    const { patronID } = req.params;
    try {
        const results = await executeQuery(`
            SELECT 
                btd.transactionDetailsID,
                btd.transactionID,
                btd.bookID,
                b.title,
                b.author,
                b.genre,
                btd.dueDate,
                bt.transactionDate
            FROM Book_Transaction_Details btd
            JOIN Book_Transactions bt ON btd.transactionID = bt.transactionID
            JOIN Books b ON btd.bookID = b.bookID
            WHERE bt.patronID = ? AND btd.returnDate IS NULL
        `, [patronID]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Check in a book by setting returnDate to today
exports.checkInBook = async (req, res) => {
    const { transactionDetailsID } = req.params;
    try {
        const result = await executeQuery(
            `UPDATE Book_Transaction_Details SET returnDate = CURDATE() WHERE transactionDetailsID = ?`,
            [transactionDetailsID]
        );
        if (result.affectedRows) {
            res.json({ message: "Book checked in successfully!" });
        } else {
            res.status(404).json({ message: "Transaction detail not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};