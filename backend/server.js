const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected!'));
mongoose.connection.on('error', (err) => console.log('MongoDB error:', err.message));

// Routes
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/urls');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    message: 'Backend is running',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Redirect short URL
app.get('/:shortCode', async (req, res) => {
  try {
    const URL = require('./models/URL');
    const Analytics = require('./models/Analytics');
    
    const { shortCode } = req.params;
    const url = await URL.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    await Analytics.create({
      urlId: url._id,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'],
    });

    await URL.updateOne(
      { _id: url._id },
      { $inc: { totalClicks: 1 }, lastVisited: new Date() }
    );

    res.redirect(url.originalURL);
  } catch (error) {
    res.status(500).json({ message: 'Error redirecting', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));