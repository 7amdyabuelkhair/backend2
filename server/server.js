require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images) from parent directory
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/auth', authRoutes);

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stemify';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    app.listen(PORT, () => {
      const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    console.log(`✓ STEMify server running on port ${PORT}`);
    console.log(`  - Site: ${url}`);
    console.log(`  - Sign in: ${url}/signin.html`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('\nMake sure you have:');
    console.log('1. Created a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas');
    console.log('2. Created a cluster and got your connection string');
    console.log('3. Created a .env file with MONGODB_URI=your_connection_string');
    process.exit(1);
  });
