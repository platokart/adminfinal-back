const mongoose = require('mongoose');

const reportingSchema = new mongoose.Schema({
  reportType: {
    type: String,
    required: [true, 'A report must have a type'],
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: [true, 'A report must have content'],
  },
});

const Reporting = mongoose.model('Reporting', reportingSchema);
module.exports = Reporting;
