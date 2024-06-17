const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  screen: {
    screenNumber: {
      type: String,
      required: true,
    },
    seatLimit: {
      type: Number,
      required: true,
    },
  },
  showtime: {
    type: Date,
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
    },
  ],
  totalPrice: {
    type: Number,
  },
  expiryTime: {
    type: Date,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
