const db = require('../helpers/database/db-connector');

// Local helper function to execute database queries with promise support
const executeQuery = async (query, params = []) => {
    try {
        const [results] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getAllPatrons = async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Patrons');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addPatron = async (req, res) => {
    const { firstName, lastName, email, membershipDate } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO Patrons (first_name, last_name, email, membershipDate) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, membershipDate]
        );
        res.json({ message: "Patron added successfully!", patronId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePatron = async (req, res) => {
    const { patronID } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Patrons WHERE patronID = ?', [patronID]);
        if (result.affectedRows) {
            res.json({ message: "Patron deleted successfully!" });
        } else {
            res.status(404).json({ message: "Patron not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePatron = async (req, res) => {
    const { patronID } = req.params;
    const { firstName, lastName, email, membershipDate } = req.body;
    try {
        const result = await executeQuery(
            'UPDATE Patrons SET first_name = ?, last_name = ?, email = ?, membershipDate = ? WHERE patronID = ?',
            [firstName, lastName, email, membershipDate, patronID]
        );
        if (result.affectedRows) {
            res.json({ message: "Patron updated successfully!" });
        } else {
            res.status(404).json({ message: "Patron not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
