// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/checkout', transactionsController.checkout);
router.get('/', transactionsController.getAllTransactions);
router.post('/', transactionsController.addTransaction);
router.delete('/:transactionID', requireAdmin, transactionsController.deleteTransaction);
router.put('/:transactionID', transactionsController.updateTransaction);
router.get('/:transactionID/details', transactionsController.getTransactionDetails);


module.exports = router;
