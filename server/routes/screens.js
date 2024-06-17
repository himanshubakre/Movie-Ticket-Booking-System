const express = require('express');
const router = express.Router();
const screenController = require('../controllers/screenController');
const auth = require('../middleware/auth');

// Admin routes for screen management
router.post('/', auth, screenController.createScreen);
router.get('/', auth, screenController.getScreens);
router.put('/:screenId', auth, screenController.updateScreen);
router.delete('/:screenId', auth, screenController.deleteScreen);

module.exports = router;
