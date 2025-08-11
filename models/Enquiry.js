const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  role: String,
  affiliationType: String,
  institute: String,
  state: String,
  district: String
} ,{
  timestamps: true
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
