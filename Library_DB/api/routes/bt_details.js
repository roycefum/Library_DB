// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const bt_detailsController = require('../controllers/bt_detailsController');

router.get('/', bt_detailsController.getAllTransactionDetails);
router.get('/patron/:patronID', bt_detailsController.getCheckedOutByPatron);
router.put('/checkin/:transactionDetailsID', bt_detailsController.checkInBook);

module.exports = router;