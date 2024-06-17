const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payment');
const foodItemRoutes = require('./routes/foodItems');
const orderRoutes = require('./routes/orders');
const seatRoutes = require('./routes/seats');
const movieRoutes = require('./routes/movies');



dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/foodItems', foodItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
