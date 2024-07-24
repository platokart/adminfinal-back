const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'on hold'],
    default: 'ongoing',
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'A project must belong to a client'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
