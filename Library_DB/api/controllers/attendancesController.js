const db = require('../helpers/database/db-connector');

// Using Node API with controllers and routes usage has been inspired by the following sources:
// https://medium.com/munchy-bytes/building-an-api-with-node-using-controllers-and-routes-ac58978d663f
// https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers

// Structure and implementation has been based on the sources but has been motified for personal usage
// This applies to all controllers in this dir

// Local helper function to execute database queries with promise support
const executeQuery = async (query, params = []) => {
    try {
        const [results] = await db.pool.query(query, params);
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getAllAttendances = async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM Patron_Events_Attendance');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addAttendance = async (req, res) => {
    const { patronID, eventID } = req.body;
    try {
        // Check if patron is already registered for this event
        const existing = await executeQuery(
            'SELECT * FROM Patron_Events_Attendance WHERE patronID = ? AND eventID = ?',
            [patronID, eventID]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: "Patron is already registered for this event." });
        }
        const result = await executeQuery(
            'INSERT INTO Patron_Events_Attendance (patronID, eventID) VALUES (?, ?)',
            [patronID, eventID]
        );
        res.json({ message: "Attendance added successfully!", eventsDetailID: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAttendance = async (req, res) => {
    const { eventsDetailID } = req.params;
    try {
        const result = await executeQuery('DELETE FROM Patron_Events_Attendance WHERE eventsDetailID = ?', [eventsDetailID]);
        result.affectedRows
            ? res.json({ message: "Attendance deleted successfully!" })
            : res.status(404).json({ message: "Attendance not found!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAttendance = async (req, res) => {
    const { eventsDetailID } = req.params;
    const { patronID, eventID } = req.body;
    try {
        const result = await executeQuery('UPDATE Patron_Events_Attendance SET patronID = ?, eventID = ? WHERE eventsDetailID = ?', [patronID, eventID, eventsDetailID]);
        result.affectedRows
            ? res.json({ message: "Attendance updated successfully!" })
            : res.status(404).json({ message: "Attendance not found!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendanceByEvent = async (req, res) => {
    const { eventID } = req.params;
    try {
        const results = await executeQuery(`
            SELECT 
                pea.eventsDetailID,
                pea.patronID,
                p.first_name,
                p.last_name,
                pea.eventID
            FROM Patron_Events_Attendance pea
            JOIN Patrons p ON pea.patronID = p.patronID
            WHERE pea.eventID = ?
        `, [eventID]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};