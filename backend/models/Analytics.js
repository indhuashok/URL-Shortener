const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: String,
  referer: String,
});

module.exports = mongoose.model('Analytics', analyticsSchema);