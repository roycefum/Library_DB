// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.getAllEvents);
router.post('/', eventsController.addEvent);
router.delete('/:eventID', eventsController.deleteEvent);
router.put('/:eventID', eventsController.updateEvent);

module.exports = router;
