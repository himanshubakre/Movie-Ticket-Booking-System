const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
const auth = require('../middleware/auth');

router.get('/available', seatController.getAvailableSeats);
router.post('/lock', auth, seatController.lockSeats);
router.post('/release', auth, seatController.releaseSeats);

module.exports = router;
