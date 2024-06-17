const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const auth = require('../middleware/auth');

router.get('/', foodItemController.getFoodItems);
router.post('/', auth, foodItemController.createFoodItem);

module.exports = router;
