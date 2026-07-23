// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const attendancesController = require('../controllers/attendancesController');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/', attendancesController.getAllAttendances);
router.post('/', attendancesController.addAttendance);
router.get('/event/:eventID', attendancesController.getAttendanceByEvent);
router.get('/patron/:patronID', attendancesController.getEventsByPatron);
router.delete('/:eventsDetailID', requireAdmin, attendancesController.deleteAttendance);
router.put('/:eventsDetailID', attendancesController.updateAttendance);


module.exports = router;
