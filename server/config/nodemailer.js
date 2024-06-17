const nodemailer = require('nodemailer');

// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'himanshubakre572@gmail.com', // Replace with your email address
    pass: 'your-password', // Replace with your email password (consider using environment variables)
  },
});

module.exports = transporter;
