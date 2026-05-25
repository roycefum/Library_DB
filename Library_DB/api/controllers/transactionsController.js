const db = require('../helpers/database/db-connector');

// Helper function to execute database queries with promise support
const executeQuery = async (query, params = []) => {
    try {
        const [results] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const results = await executeQuery(`
            SELECT 
                bt.transactionID,
                bt.patronID,
                p.first_name,
                p.last_name,
                bt.numberBooks,
                bt.staffID,
                s.first_name AS staff_first,
                s.last_name AS staff_last,
                bt.transactionDate
            FROM Book_Transactions bt
            JOIN Patrons p ON bt.patronID = p.patronID
            JOIN Staff s ON bt.staffID = s.staffID
            ORDER BY bt.transactionID ASC
        `);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addTransaction = async (req, res) => {
    const { patronID, numberBooks, staffID, transactionDate, transactionType } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO Book_Transactions (patronID, numberBooks, staffID, transactionDate, transactionType) VALUES (?, ?, ?, ?)',
            [patronID, numberBooks, staffID, transactionDate, transactionType]
        );
        res.json({ message: "Transaction added successfully!", transactionID: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
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
};

exports.updateTransaction = async (req, res) => {
    const { transactionID } = req.params;
    const { patronID, numberBooks, staffID, transactionDate } = req.body;
    try {
        const result = await executeQuery(
            `UPDATE Book_Transactions SET patronID = ?, numberBooks = ?, staffID = ?, transactionDate = ? WHERE transactionID = ?`,
            [patronID, numberBooks, staffID, transactionDate, transactionID]
        );
        if (result.affectedRows) {
            res.json({ message: "Transaction updated successfully!" });
        } else {
            res.status(404).json({ message: "Transaction not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.checkout = async (req, res) => {
    const { patronID, staffID, transactionDate, bookIDs } = req.body;
    
    if (!patronID || !staffID || !transactionDate || !bookIDs || bookIDs.length === 0) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        await executeQuery('START TRANSACTION');

        // Get loan period from settings
        const setting = await executeQuery(
            "SELECT settingValue FROM Settings WHERE settingName = 'loan_period_days'"
        );
        const loanPeriod = parseInt(setting[0].settingValue, 10);

        // Create the transaction header
        const transaction = await executeQuery(
            'INSERT INTO Book_Transactions (patronID, numberBooks, staffID, transactionDate) VALUES (?, ?, ?, ?)',
            [patronID, bookIDs.length, staffID, transactionDate]
        );

        const transactionID = transaction.insertId;

        // Calculate due date from settings
        const dueDate = new Date(transactionDate);
        dueDate.setDate(dueDate.getDate() + loanPeriod);
        const dueDateStr = dueDate.toISOString().split('T')[0];

        // Create a details row for each book
        for (const bookID of bookIDs) {
            await executeQuery(
                'INSERT INTO Book_Transaction_Details (transactionID, bookID, dueDate) VALUES (?, ?, ?)',
                [transactionID, bookID, dueDateStr]
            );
        }

        await executeQuery('COMMIT');
        res.json({ message: "Checkout successful!", transactionID });

    } catch (err) {
        await executeQuery('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};