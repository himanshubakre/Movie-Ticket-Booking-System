const FoodItem = require('../models/FoodItem');

exports.getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createFoodItem = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const newFoodItem = new FoodItem({
      name,
      price,
      description,
      category,
    });

    const foodItem = await newFoodItem.save();
    res.json(foodItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
