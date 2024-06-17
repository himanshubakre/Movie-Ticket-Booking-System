const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lockUntil: {
    type: Date,
  },
});

module.exports = mongoose.model('Seat', SeatSchema);
