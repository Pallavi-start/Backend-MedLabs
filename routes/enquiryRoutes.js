import express from 'express';
import Enquiry from '../models/Enquiry.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving enquiry' });
  }
});

export default router;
