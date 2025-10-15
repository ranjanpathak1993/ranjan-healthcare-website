const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  message: String
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointment', async (req, res) => {
  const { name, email, date, message } = req.body;
  const appointment = new Appointment({ name, email, date, message });
  await appointment.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Appointment Confirmation',
    text: `Dear ${name}, your appointment on ${date} has been confirmed.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).send('Appointment saved and email sent');
  });
});

app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});
