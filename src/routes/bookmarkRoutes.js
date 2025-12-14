const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// Map the HTTP methods to the controller functions
router.post('/', bookmarkController.createBookmark);      // Create
router.get('/', bookmarkController.getAllBookmarks);      // Read All
router.get('/:id', bookmarkController.getBookmarkById);   // Read One
router.put('/:id', bookmarkController.updateBookmark);    // Update
router.delete('/:id', bookmarkController.deleteBookmark); // Delete

module.exports = router;