const express = require('express');
const URL = require('../models/URL');
const Analytics = require('../models/Analytics');
const verifyToken = require('../middleware/auth');

const router = express.Router();

function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function isValidURL(string) {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/i;
  return urlPattern.test(string);
}

router.post('/create', verifyToken, async (req, res) => {
  try {
    const { originalURL } = req.body;

    if (!originalURL) {
      return res.status(400).json({ message: 'Original URL required' });
    }

    if (!isValidURL(originalURL)) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    let shortCode = generateShortCode();

    while (await URL.findOne({ shortCode })) {
      shortCode = generateShortCode();
    }

    const url = new URL({
      shortCode,
      originalURL,
      userId: req.userId,
    });

    await url.save();

    res.json({
      message: 'Short URL created',
      data: {
        shortCode: url.shortCode,
        shortURL: `http://localhost:5000/${url.shortCode}`,
        originalURL: url.originalURL,
        createdAt: url.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating short URL', error: error.message });
  }
});

router.get('/my-urls', verifyToken, async (req, res) => {
  try {
    const urls = await URL.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      message: 'URLs retrieved',
      data: urls,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving URLs', error: error.message });
  }
});

router.delete('/:shortCode', verifyToken, async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await URL.findOne({ shortCode, userId: req.userId });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    await URL.deleteOne({ _id: url._id });
    await Analytics.deleteMany({ urlId: url._id });

    res.json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting URL', error: error.message });
  }
});

module.exports = router;