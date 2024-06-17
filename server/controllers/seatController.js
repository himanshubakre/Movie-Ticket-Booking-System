const Seat = require('../models/Seat');
const Booking = require('../models/Booking');

// Get available seats
exports.getAvailableSeats = async (req, res) => {
  try {
    const seats = await Seat.find({ isAvailable: true, lockUntil: { $lte: new Date() } });
    res.json(seats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Lock seats for booking
exports.lockSeats = async (req, res) => {
  const { seats, userId, duration } = req.body; // seats is an array of seat IDs
  const lockUntil = new Date(Date.now() + duration * 60000); // lock duration in minutes

  try {
    // Check if seats are available
    const availableSeats = await Seat.find({
      _id: { $in: seats },
      isAvailable: true,
      lockUntil: { $lte: new Date() },
    });

    if (availableSeats.length !== seats.length) {
      return res.status(400).json({ msg: 'Some seats are already locked or unavailable' });
    }

    // Lock seats
    await Seat.updateMany(
      { _id: { $in: seats } },
      { $set: { isAvailable: false, lockUntil } }
    );

    // Create a temporary booking to hold the lock
    const booking = new Booking({
      user: userId,
      seats,
      expiryTime: lockUntil,
    });

    await booking.save();

    res.json({ msg: 'Seats locked successfully', bookingId: booking._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Release seats
exports.releaseSeats = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Release seats
    await Seat.updateMany(
      { _id: { $in: booking.seats } },
      { $set: { isAvailable: true, lockUntil: new Date(0) } }
    );

    // Remove the temporary booking
    await Booking.findByIdAndRemove(bookingId);

    res.json({ msg: 'Seats released successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
