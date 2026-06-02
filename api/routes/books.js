// Modified based on Express documentation starter code
// Source: https://expressjs.com/en/4x/api.html#router

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.post('/', booksController.addBook);
router.put('/:isbn', booksController.updateBook);
router.delete('/:isbn', booksController.deleteBook);

module.exports = router;
