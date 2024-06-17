const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    auth,
    [
      check('movieId', 'Movie ID is required').not().isEmpty(),
      check('showtime', 'Showtime is required').not().isEmpty(),
      check('seats', 'Seats are required').isArray({ min: 1 }),
      check('totalPrice', 'Total price is required').isFloat({ min: 0 }),
    ],
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  bookingController.createBooking
);

module.exports = router;
