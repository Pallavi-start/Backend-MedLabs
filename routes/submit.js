import express from 'express';
import Admission from '../models/Admission.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();
    res.status(201).json({ message: 'Admission form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving admission form' });
  }
});

export default router;

