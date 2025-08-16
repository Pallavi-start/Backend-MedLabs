import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String,
  affiliationType: String,
  institute: String,
  state: String,
  district: String
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);
export default Enquiry; // ✅ default export

