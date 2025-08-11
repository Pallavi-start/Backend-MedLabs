// models/Admission.js
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  campus: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);
