const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const enquiryRoutes = require('./routes/enquiryRoutes');
const submitRoutes = require('./routes/submit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admissions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/submit', submitRoutes); // ✅ Using the modular route

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
