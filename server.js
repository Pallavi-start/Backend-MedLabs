import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import submitRouter from './routes/submit.js';
import enquiryRouter from './routes/enquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/submit', submitRouter);       // ApplyNow → Admission
app.use('/api/enquiry', enquiryRouter);     // PartnerWithUs → Enquiry

// Test route
app.get('/api/test', (req, res) => res.json({ message: 'API is working!' }));

// Serve React build
const __dirnameFull = path.resolve();
const buildPath = path.join(__dirnameFull, 'build', 'index.html');

if (fs.existsSync(buildPath)) {
  app.use(express.static(path.join(__dirnameFull, 'build')));
  app.get('*', (req, res) => res.sendFile(buildPath));
} else {
  app.get('*', (req, res) => res.send('✅ Backend is running. No frontend build found.'));
}

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

