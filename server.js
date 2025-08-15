
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes example
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve frontend if it exists
const __dirnameFull = path.resolve();
const buildPath = path.join(__dirnameFull, 'frontend', 'build', 'index.html');

if (fs.existsSync(buildPath)) {
  app.use(express.static(path.join(__dirnameFull, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(buildPath);
  });
} else {
  // Fallback for when build does not exist (Render backend only mode)
  app.get('*', (req, res) => {
    res.send('✅ Backend is running. No frontend build found.');
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
