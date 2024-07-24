const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A dashboard must have a name'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;
