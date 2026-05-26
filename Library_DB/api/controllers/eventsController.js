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

exports.getAllEvents = async (req, res) => {
    try {
        const results = await executeQuery(`
            SELECT 
                pe.eventID,
                pe.eventName,
                pe.event_Date,
                pe.description,
                pe.staffID,
                s.first_name AS staff_first,
                s.last_name AS staff_last
            FROM Patron_Events pe
            JOIN Staff s ON pe.staffID = s.staffID
            ORDER BY pe.event_Date DESC
        `);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addEvent = async (req, res) => {
    const { eventName, event_Date, description, staffID } = req.body;
    if (!eventName || !event_Date || !staffID) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const result = await executeQuery(
            'INSERT INTO Patron_Events (eventName, event_Date, description, staffID) VALUES (?, ?, ?, ?)',
            [eventName, event_Date, description, staffID]
        );
        res.json({ message: "Event added successfully!", eventId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
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
};

exports.updateEvent = async (req, res) => {
    const { eventID } = req.params;
    const { eventName, event_Date, description, staffID } = req.body;
    try {
        const result = await executeQuery(
            'UPDATE Patron_Events SET eventName = ?, event_Date = ?, description = ?, staffID = ? WHERE eventID = ?',
            [eventName, event_Date, description, staffID, eventID]
        );
        if (result.affectedRows) {
            res.json({ message: "Event updated successfully!" });
        } else {
            res.status(404).json({ message: "Event not found!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
