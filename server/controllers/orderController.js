const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      items,
      totalPrice,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
