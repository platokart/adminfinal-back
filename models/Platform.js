const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A platform must have a name'],
  },
  description: {
    type: String,
    required: [true, 'A platform must have a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Platform = mongoose.model('Platform', platformSchema);
module.exports = Platform;
