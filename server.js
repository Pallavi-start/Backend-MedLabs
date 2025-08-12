require('dotenv').config(); // load env variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const enquiryRoutes = require('./routes/enquiryRoutes');
const submitRoutes = require('./routes/submit');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB Atlas connection error:', err));

app.use('/api/enquiry', enquiryRoutes);
app.use('/api/submit', submitRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
