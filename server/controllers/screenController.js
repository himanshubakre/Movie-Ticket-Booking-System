const Screen = require('../models/Screen');

// Create a new screen
exports.createScreen = async (req, res) => {
  const { screenNumber, seatLimit, seats } = req.body;

  try {
    const newScreen = new Screen({
      screenNumber,
      seatLimit,
      seats,
    });

    await newScreen.save();
    res.json(newScreen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all screens
exports.getScreens = async (req, res) => {
  try {
    const screens = await Screen.find();
    res.json(screens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a screen
exports.updateScreen = async (req, res) => {
  const { screenId } = req.params;
  const { screenNumber, seatLimit, seats } = req.body;

  try {
    let screen = await Screen.findById(screenId);

    if (!screen) {
      return res.status(404).json({ msg: 'Screen not found' });
    }

    screen.screenNumber = screenNumber;
    screen.seatLimit = seatLimit;
    screen.seats = seats;

    await screen.save();
    res.json(screen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a screen
exports.deleteScreen = async (req, res) => {
  const { screenId } = req.params;

  try {
    let screen = await Screen.findById(screenId);

    if (!screen) {
      return res.status(404).json({ msg: 'Screen not found' });
    }

    await screen.remove();
    res.json({ msg: 'Screen removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
