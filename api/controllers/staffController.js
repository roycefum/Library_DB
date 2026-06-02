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

exports.getAllStaff = async (req, res) => {
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
};

exports.addStaff = async (req, res) => {
    const { firstName, lastName, position } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO Staff (first_name, last_name, position) VALUES (?, ?, ?)',
            [firstName, lastName, position]
        );
        res.json({ message: "Staff member added successfully!", staffId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Failed to add staff member: " + err.message });
    }
};

exports.deleteStaff = async (req, res) => {
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
};

exports.updateStaff = async (req, res) => {
    const { staffId } = req.params;
    const { firstName, lastName, position } = req.body;
    try {
        const result = await executeQuery(
            'UPDATE Staff SET first_name = ?, last_name = ?, position = ? WHERE staffID = ?',
            [firstName, lastName, position, staffId]
        );
        if (result.affectedRows) {
            res.json({ message: "Staff member updated successfully!" });
        } else {
            res.status(404).json({ message: "Staff member not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to update staff member: " + err.message });
    }
};
