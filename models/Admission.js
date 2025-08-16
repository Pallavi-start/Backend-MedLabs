import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  campus: String
  // add other fields if needed
});

// ✅ Use default export
const Admission = mongoose.model('Admission', AdmissionSchema);
export default Admission;
