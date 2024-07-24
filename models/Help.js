const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, 'A help topic must have a name'],
  },
  content: {
    type: String,
    required: [true, 'A help topic must have content'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Help = mongoose.model('Help', helpSchema);
module.exports = Help;
