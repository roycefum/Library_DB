// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const attendancesController = require('../controllers/attendancesController');

router.get('/', attendancesController.getAllAttendances);
router.post('/', attendancesController.addAttendance);
router.delete('/:eventsDetailID', attendancesController.deleteAttendance);
router.put('/:eventsDetailID', attendancesController.updateAttendance);

module.exports = router;
