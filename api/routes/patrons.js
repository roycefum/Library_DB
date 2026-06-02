// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const patronsController = require('../controllers/patronsController');

router.get('/', patronsController.getAllPatrons);
router.post('/', patronsController.addPatron);
router.delete('/:patronID', patronsController.deletePatron);
router.put('/:patronID', patronsController.updatePatron);

module.exports = router;
