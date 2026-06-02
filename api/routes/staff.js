// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController');
router.get('/', staffController.getAllStaff);
router.post('/', staffController.addStaff);
router.delete('/:staffId', staffController.deleteStaff);
router.put('/:staffId', staffController.updateStaff);

module.exports = router;
