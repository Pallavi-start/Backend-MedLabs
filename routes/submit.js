const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Admission = require('../models/Admission'); // ✅ Import your model
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/', async (req, res) => {
  console.log('📥 Incoming data:', req.body); // ✅ Log incoming data
  const { name, email, phone, campus } = req.body;

  try {
    const admission = new Admission({ name, email, phone, campus });
    const saved = await admission.save(); // ✅ Save and log
    console.log('✅ Saved to DB:', saved);

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New Admission Form Submitted',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCampus: ${campus}`
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Form Submission Received',
      text: `Hi ${name},\n\nThank you for submitting your form.\nWe will contact you soon.\n\n- Admissions Team`
    });

    res.status(200).json({ message: 'Form submitted and emails sent' });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Error submitting form' });
  }
});

module.exports = router;