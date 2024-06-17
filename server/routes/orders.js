const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post(
  '/',
  [
    auth,
    [
      check('items', 'Items are required').isArray({ min: 1 }),
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
  orderController.createOrder
);

module.exports = router;
