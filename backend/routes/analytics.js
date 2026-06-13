const express = require('express');
const URL = require('../models/URL');
const Analytics = require('../models/Analytics');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/:shortCode', verifyToken, async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await URL.findOne({ shortCode, userId: req.userId });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const analytics = await Analytics.find({ urlId: url._id })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({
      message: 'Analytics retrieved',
      data: {
        shortCode: url.shortCode,
        originalURL: url.originalURL,
        totalClicks: url.totalClicks,
        createdAt: url.createdAt,
        lastVisited: url.lastVisited,
        recentClicks: analytics,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving analytics', error: error.message });
  }
});

module.exports = router;