const transporter = require('../config/nodemailer');

const sendBookingConfirmationEmail = async (userEmail, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: 'himanshubakre572@gmail.com',
      to: userEmail,
      subject: 'Booking Confirmation',
      html: `<p>Dear User,</p><p>Your booking for ${bookingDetails.movieTitle} on ${bookingDetails.showtime} has been confirmed.</p>`,
    });

    console.log('Booking confirmation email sent');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
  }
};

module.exports = {
  sendBookingConfirmationEmail,
};
